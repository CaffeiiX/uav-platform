import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectUavInPieAtom, uavPlanPathAreaAtom } from "../../store/visual";
// const data = [
//   {
//     name: "<5",
//     value: 19912018,
//   },
//   {
//     name: "5-9",
//     value: 20501982,
//   },
//   {
//     name: "10-14",
//     value: 20679786,
//   },
//   {
//     name: "15-19",
//     value: 21354481,
//   },
//   {
//     name: "20-24",
//     value: 22604232,
//   },
//   {
//     name: "25-29",
//     value: 21698010,
//   },
//   {
//     name: "30-34",
//     value: 21183639,
//   },
//   {
//     name: "35-39",
//     value: 19855782,
//   },
//   {
//     name: "40-44",
//     value: 20796128,
//   },
//   {
//     name: "45-49",
//     value: 21370368,
//   },
//   {
//     name: "50-54",
//     value: 22525490,
//   },
//   {
//     name: "55-59",
//     value: 21001947,
//   },
//   {
//     name: "60-64",
//     value: 18415681,
//   },
//   {
//     name: "65-69",
//     value: 14547446,
//   },
//   {
//     name: "70-74",
//     value: 10587721,
//   },
//   {
//     name: "75-79",
//     value: 7730129,
//   },
//   {
//     name: "80-84",
//     value: 5811429,
//   },
//   {
//     name: "≥85",
//     value: 5938752,
//   },
// ];

const PieChartVisual: React.FC<{}> = () => {
  const data = useRecoilValue(uavPlanPathAreaAtom);
  const setSelectUavInPie = useSetRecoilState(selectUavInPieAtom);
  const svgRef = useRef(null);
  const [width, height] = [300, 300];
  const outerRadius = width / 4;
  const innerRadius = width / 2;
  const labelRadius = (innerRadius + outerRadius) / 2;
  const stroke = innerRadius > 0 ? "none" : "white";
  const padAngle = stroke === "none" ? 1 / outerRadius : 0;
  const strokeWidth = 1;
  const strokeLinejoin = "round";
  useEffect(() => {
    const N = data.map((item) => item.name);
    const V = data.map((item) => item.value);
    const I = d3.range(N.length).filter((i) => !isNaN(V[i]));
    const names = new d3.InternSet(N);
    let colors = d3.schemeSpectral[names.size];
    if (colors === undefined)
      colors = d3.quantize(
        (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
        names.size
      );
    const color = d3.scaleOrdinal(names, colors);
    const formatValue = d3.format(",");
    const title = (i: number) =>
      `无人机：${N[i]}\n覆盖面积：${formatValue(V[i])}`;
    const name = (i: number) => `${N[i]}`;
    const value = (i: number) => `${V[i]}`;
    const arcs = d3
      .pie()
      .padAngle(padAngle)
      .sort(null)
      .value((i) => V[i as number])(I);

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    const svg = d3.select(svgRef.current);
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const path = svg
      .append("g")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin)
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d) => {
        return color(N[d.data as any]);
      })
      .attr("d", arc as any);
    const circle = svg
      .append("g")
      .append("circle")
      .style("stroke", "rgb(31, 31, 31)")
      .style("fill", "rgb(31, 31, 31)")
      .attr('r', innerRadius - outerRadius)
      .on('click', (i,d) => {
        path.attr('fill-opacity', (node) => 1.0);
        setSelectUavInPie('');
      })
    path.on("click", (i, d) => {
      console.log(name(d.data as number));
      console.log(value(d.data as number));
      path.attr("fill-opacity", (node) => (d === node ? 1.0 : 0.3));
      setSelectUavInPie(name(d.data as number));
    });
    path.append("title").text((d: any) => title(d.data));
    // svg
    //   .append("g")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 10)
    //   .attr("text-anchor", "middle")
    //   .selectAll("text")
    //   .data(arcs)
    //   .join("text")
    //   .attr("transform", (d) => `translate(${arcLabel.centroid(d as any)})`)
    //   .selectAll("tspan")
    //   .data((d) => {
    //     const lines = `${title(d.data as any)}`.split(/\n/);
    //     return d.endAngle - d.startAngle > 0.25 ? lines : lines.slice(0, 1);
    //   })
    //   .join("tspan")
    //   .attr("x", 0)
    //   .attr("y", (_, i) => `${i * 1.1}em`)
    //   .attr("font-weight", (_, i) => (i ? null : "bold"))
    //   .text((d) => d);
  }, []);
  return <svg ref={svgRef} width={300} height={300} color={"white"}></svg>;
};

export default PieChartVisual;
