import * as React from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import "./cChoropleth.scss";



export class Choropleth extends React.Component{
    constructor(props:any){
        super(props);
    }

    private drawChoropleth=()=>{
        const width:number = 1000;
        const height:number = 600;
        const margin:any = {
            top: 20 as number,
            bottom: 40 as number,
            left: 40 as number,
            right: 20 as number,
        }

        
        const colorBrew:string[] =['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];

        const svg:any = d3.select("#visHolder").append("svg")
            .attr("width", width+margin.left+margin.right)
            .attr("height", height+margin.top+margin.bottom);
        
        const group:any = svg.append("g")
            .attr("class", "counties")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate("+margin.left+" "+margin.top+")");

        const tooltip:any = d3.select("body").append("div")
            .attr("id", "tooltip")
            .attr("class", "container text-center");

        (async ()=>{
            try{
                const educationFile:any = await fetch('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json')
                                                .then(resp=>resp.json());
                const countyFile:any = await fetch('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json')
                                                .then(resp=>resp.json());
                const bachelorPercent:number[] = educationFile.map((d:any)=> d.bachelorsOrHigher).sort((a:number, b:number)=>(a-b));
                const array:number[]=[];
                const step:number = Math.round((bachelorPercent[bachelorPercent.length-1]-bachelorPercent[0])/(colorBrew.length-2));
                for(let i:number= bachelorPercent[0]; i<=bachelorPercent[bachelorPercent.length-1]; i+=step){
                    array.push(i);
                }
                const colorScale = d3.scaleThreshold<number, string>()
                    .domain(array)
                    .range(colorBrew)
                
                //draw legend
                const legendFirstPoint:number = width*3/5;
                const legendLastPoint:number =width*4/5;

                const legendScale:any = d3.scaleBand()
                    .domain(colorBrew)
                    .range([legendFirstPoint,legendLastPoint])

                const legend:any = group.append("g").attr("id", "legend")
                legend.selectAll("rect").data(colorBrew).enter()
                    .append("rect")
                        .attr("class", "bar")
                        .attr("x", (d:any)=> {
                            return legendScale(d);
                        })
                        .attr("y", 20)
                        .attr("width", (legendLastPoint-legendFirstPoint)/colorBrew.length)
                        .attr("height", 15)
                        .style("fill", (d:any)=> d);

                //draw legend axies
                const rangeThreshold:number[]= [];
                for(let i=legendFirstPoint; i<= legendLastPoint; i+=(legendLastPoint-legendFirstPoint)/(colorBrew.length)){
                    rangeThreshold.push(i);
                }
                const axisScale:any = d3.scaleThreshold()
                    .domain(array)
                    .range(rangeThreshold);
                
                const xAsis:any = d3.axisBottom(axisScale).tickFormat(d3.format(".1f"));
                group.append("g")
                        .attr("id", "xAxis")
                        .attr("transform", "translate(0 "+35+")")
                        .call(xAsis)
                        
                //draw path
                const path:any = d3.geoPath();
                const geoCollection:any = topojson.feature(countyFile, countyFile.objects.counties);
                group.selectAll("path").data(geoCollection.features).enter()
                    .append("path")
                        .attr("class", "county")
                        .attr("data-fips", (d:any)=>{
                            const fips:any = educationFile.filter((edu:any)=> edu.fips === d.id)
                            if(fips[0]){
                                return fips[0].fips;
                            } else{
                                return "na";
                            }
                        })
                        .attr("data-education", (d:any)=>{
                            const fips:any = educationFile.filter((edu:any)=> edu.fips === d.id)
                            if(fips[0]){
                                return fips[0].bachelorsOrHigher;
                            } else{
                                return "na";
                            }
                        })
                        .style("fill", (d:any) =>{
                            const array:any = educationFile.filter((edu:any)=> edu.fips === d.id)
                            if(array.length<1 || array.length>1){
                                console.log("County id is not unique. Check input education file");
                                return "white";
                            } else{
                                return colorScale(array[0].bachelorsOrHigher);
                            }
                        })
                        .attr("d", path)
                        .on("mouseover", (d:any)=>{
                            tooltip
                                .style("left", d3.event.pageX+"px")
                                .style("top", d3.event.pageY+"px")
                                .attr("data-education", ()=>{
                                    const fips:any = educationFile.filter((edu:any)=> edu.fips === d.id)
                                    if(fips[0]){
                                        return fips[0].bachelorsOrHigher;
                                    } else{
                                        return "na";
                                    }
                                })
                                .html(()=>{
                                    const array:any = educationFile.filter((edu:any)=> edu.fips === d.id)
                                    if(array.length<1 || array.length>1){
                                        return "<p>County id is not unique. Check input education file</p>";
                                    } else{
                                        return "<p>"+array[0].area_name+", "+array[0].state+": "+array[0].bachelorsOrHigher+"%</p>";
                                    }
                                })
                                .style("visibility", "visible")
                        })
                        .on("mouseout", ()=>{
                            tooltip
                                .style("visibility", "hidden")
                        })
    
            }
            catch(err){
                console.log(err);
            }
        })()
        
    }

    componentDidMount(){
        this.drawChoropleth();
    }

    render(){
        return(
            <div className="container text-center" id="pagewrapper-choro">
                <h1 id="title">United States Educational Attainment</h1>
                <br/>
                <h5 id="description">Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</h5>
                <div className="row justify-content-center" id="visHolder"></div>
            </div>
        )
    }

}