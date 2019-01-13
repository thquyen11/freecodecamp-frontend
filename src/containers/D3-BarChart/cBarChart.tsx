import * as React from "react";
import * as d3 from "d3";
import "./cBarChart.scss";




export class BarChart extends React.Component{
    constructor(props: any){
        super(props);
    }

    private drawChart = () =>{
        const dataApi = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
        fetch(dataApi)
            .then(resp => resp.json())
            .then(object => object.data)
            .then(data => {
                const width:number = 800;
                const height:number =400;
                const padding:number=50;
                const listGDP:any = data.map((data:any, index:number) => data[1]);
                const listYear:any = data.map((data:any, index:number)=> new Date(data[0]));

                const yScale = d3.scaleLinear().domain([0, Math.max(...listGDP)]).range([height-padding, padding]);
                const xScale = d3.scaleTime().domain([Math.min(...listYear), Math.max(...listYear)]).range([padding, width-padding]);

                const svg = d3.select("#visHolder").append("svg").attr("width", width).attr("height", height);

                const tooltip = d3.select("#visHolder").append("div")
                    .attr("class", "container")
                    .attr("id", "tooltip")
                    .style("visibility", "hidden")
                
                const barWidth:number = (width-2*padding)/data.length;
                svg.selectAll("rect").data(data).enter()
                    .append("rect")
                        .attr("x", d => {
                            const date:Date = new Date(d[0]);
                            return xScale(date.getTime());
                        })
                        .attr("y", d=> yScale(d[1]))
                        .attr("width", barWidth)
                        .attr("height", d=> (height-padding)-yScale(d[1]))
                        .attr("class", "bar")
                        .attr("data-date", d=> d[0])
                        .attr("data-gdp", d=> d[1])
                        .on("mouseover", (d, i)=>{
                            tooltip
                                .attr("data-date", d[0])
                                .transition().duration(50)
                                .style("visibility", "visible")
                                .style('left', i * barWidth + 200 + 'px')
                                .style('top', 5/8*height +"px")
                            tooltip
                                .html(() => {
                                    const year = d[0].slice(0,7);
                                    const tooltipContent:string= `<div class="row justify-content-center">` + year +`</div><div class="row justify-content-center">$`+d[1]+ " Billions</div>";
                                    return tooltipContent;
                                })
                        })
                        .on("mouseout", ()=>{
                            tooltip
                                .transition().duration(100)
                                .style("visibility", "hidden");
                        })

                //Axies, titles
                svg.append('text').
                    attr('transform', 'rotate(-90)').
                    attr('x', -200).
                    attr('y', 80).
                    text('Gross Domestic Product');
                
                const xAxis:any = d3.axisBottom(xScale);
                const yAxis:any = d3.axisLeft(yScale);
                svg.append("g").call(xAxis)
                    .attr("id", "x-axis")
                    .attr("transform", "translate(0 " + (height-padding) +")");
                svg.append("g").call(yAxis)
                    .attr("id", "y-axis")
                    .attr("transform", "translate("+padding+" 0)");

            })
    }

    componentDidMount(){
        this.drawChart();
    }

    render(){
        return(
            <div className="container" id="pagewrapper-barchart">
                <div id="title" className="text-center">
                    <h1>United States GDP</h1>
                </div>
                <div id="visHolder" className="row"></div>
            </div>
        )
    }
    
}