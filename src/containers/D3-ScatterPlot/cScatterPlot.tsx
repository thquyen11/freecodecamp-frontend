import * as React from "react";
import * as d3 from "d3";
import "./cScatterPlot.scss";



export class ScatterPlot extends React.Component{
    constructor(props:any){
        super(props);
    }

    private drawPlot=()=>{
        const dataAPI = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
        fetch(dataAPI)
            .then(resp => resp.json())
            .then(data => {
                const width:number=800;
                const height:number=400;
                const padding:number=40;
                const years = data.map((rider:any, index:number) => rider.Year);
                const timeInMinutes = data.map((rider:any, index:number)=> {
                    return parseFloat(rider.Time.replace(":", "."));
                });

                const xScale = d3.scaleLinear().domain([Math.min(...years), Math.max(...years)]).range([padding, width-padding]);
                const xAxis = d3.axisBottom(xScale);
                const yScale = d3.scaleLinear().domain([Math.min(...timeInMinutes), Math.max(...timeInMinutes)]).range([height-padding, padding]);
                const yAxis = d3.axisLeft(yScale);

                const svg = d3.select("#visHolder").append("svg").attr("width", width).attr("height", height);
                const tooltip:any = d3.select("body").append("div")
                    .attr("id", "tooltip")
                    .style("visibility", "hidden");

                svg.selectAll("circle").data(data).enter()
                    .append("circle")
                        .attr("class", "dot")
                        .attr("r", 6)
                        .attr("cx", (d:any) => xScale(d.Year))
                        .attr("cy", (d:any) => yScale(parseFloat(d.Time.replace(":","."))))
                        .attr("fill", (d:any)=> {
                            return d.Doping!==""? "blue" : "orange";
                        })
                        .attr("data-xvalue", (d:any)=> xScale(d.Year))
                        .attr("data-yvalue", (d:any)=> yScale(parseFloat(d.Time.replace(":","."))))
                        .on("mouseover", (d:any, index:number)=>[
                            tooltip
                                .attr("data-year", xScale(d.Year))
                                .style("visibility", "visible")
                                .style("left", d3.event.pageX+"px")
                                .style("top", d3.event.pageY+"px")
                                .html(d.Name + ":" + d.Nationality + "</br>" + "Year: "+d.Year+", Time: "+d.Time+"</br></br>"+d.Doping)
                        ])
                        .on("mouseout", ()=>{
                            tooltip
                                .style("visibility", "hidden")
                        })

                svg.append("g").call(xAxis)
                    .attr("id", "x-axis")
                    .attr("transform", "translate(0 "+(height-padding)+")");
                svg.append("g").call(yAxis)
                    .attr("id", "y-axis")
                    .attr("transform", "translate("+padding+" 0)");
                
                d3.select("#visHolder").append("div")
                    .attr("id", "lengend")
                    .html(`<p>No doping allegations<span class="no-doping"></span></p>
                        <p>Riders with doing allegations<span class="yes-doping"></span></p>`);
                
                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -150)
                    .attr("y", 12)
                    .text("Time in Minutes")
            })
    }

    componentDidMount(){
        this.drawPlot();
    }

    render(){
        return(
            <div className="container text-center" id="pagewrapper-scatter">
                <h3 id="title">Doping in Professional Bicycle Racing</h3>
                <h4>35 Fastest times up Alpe d'Huez</h4>
                <div className="row" id="visHolder"></div>

                
            </div>
        )
    }
}