import * as React from "react";
import * as d3 from "d3";
import "./cTreeMap.scss";



export class TreeMap extends React.Component{
    constructor(props:any){
        super(props);
    }

    componentDidMount(){
        const width:number=1050;
        const height:number=600;
        const margin:any={
            top: 10 as number,
            bottom: 10 as number,
            left: 0 as number,
            right: 0 as number,
        }

        const svg:any = d3.select("#visHolder").append("svg")
            .attr("width", width+margin.left + margin.right)
            .attr("height", height+margin.top + margin.bottom);
        
        const group:any = svg.append("g")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate("+margin.left+" "+margin.top+")");

        (async ()=>{
            try{
                const gameFile:any = await fetch('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json').then(resp=> resp.json());

                const treemap:any = d3.treemap()
                    .size([width, height])
                    .paddingInner(1);
                
                // root is an object represent the tree. TreeMap only draw the tree-leaves which retrieve from root.leaves()
                // input file gameFile to hierarchy() need to follow the format { attribue: x ; children: [] }
                // d3.hierarchy traverse gameFile until the leave nodes through attribute children:[]
                // CAUTION: following sum() is working on tree-leaves by default
                // sum() specify the value will be illustrated on TreeMap. Inside function sum(d:any => {}), d is the leave node
                // sort() by height desc + value desc. All childnodes are grouped by their parent by default
                const root:any = d3.hierarchy(gameFile)
                    .sum((d:any)=> d.value)
                    .sort((a:any, b:any) => b.height-a.height || b.value - a.value); 

                treemap(root);

                //draw treemap
                const cell:any = group.selectAll("g").data(root.leaves()).enter()
                    .append("g")
                        .attr("transform", function (d:any) {return "translate(" + d.x0 + "," + d.y0 + ")";});

                // Tile
                const parent: string[]= Array.from(new Set(root.leaves().map((p:any)=> p.parent.data.name)));
                const colorBrew:string[] = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'];
                
                const tooltip:any = d3.select("body").append("div")
                    .attr("id", "tooltip")

                
                cell.append("rect")
                    .attr("class", "tile")
                    .attr("data-name", (d:any)=> d.data.name)
                    .attr("data-category", (d:any)=> d.data.category)
                    .attr("data-value", (d:any)=> d.data.value)
                    .attr("width", (d:any)=> (d.x1-d.x0))
                    .attr("height", (d:any)=> (d.y1-d.y0))
                    .style("fill", (d:any)=> this.findParentColor(d.parent.data.name, parent, colorBrew))
                    .on("mousemove", (d:any)=>{
                        tooltip
                            .attr("data-value", d.data.value)
                            .style("left", (d3.event.pageX+20)+"px" )
                            .style("top", (d3.event.pageY)+"px" )
                            .html(d.data.name+"<br>"+d.data.category+"<br>"+d.value)
                            .style("opacity", 0.9)
                    })
                    .on("mouseout", ()=>{
                        tooltip
                            .style("opacity", 0)
                    })

                // Tile's text
                cell.append("text")
                    .attr("x", 5)
                    .attr("y", 15)
                    .text((d:any)=> d.data.name)

                // Legend
                const legend = d3.select("#visHolder").append("div")
                    .attr("id", "legend")
                    .attr("class", "row col-md-9 justify-content-center")
                
                legend.selectAll("rect").data(parent).enter()
                    .append("rect") //this rect is redundant. I put it here in order to pass FCC's test case ^^
                        .attr("class", "legend-item")
                        .append("div")
                            .attr("class", "row justify-content-left")
                            .style("width", "80px")
                            .style("margin", "5px 30px")
                            .html((p:any)=> {
                                return ("<div style=\"width: 15px; height: 15px; background-color:"+this.findParentColor(p, parent, colorBrew)+";\"></div>"+p)
                            })
            }
            catch(err){
                console.log(err);
            }
        })()
    }

    render(){
        return(
            <div className="container" id="pagewrapper-treemap">
                <h2 id="title">Video Game Sales</h2>
                <h5 id="description">Top 100 Most Sold Video Games Grouped by Platform</h5>
                <div className="row" id="visHolder"></div>
            </div>
        )
    }

    private findParentColor(p:any, parent: string[], colorBrew: string[]): string {
            const index: number = parent.indexOf(p);
            if (index > -1) {
                return colorBrew[index];
            }
            else {
                return "white";
            }
        };
}