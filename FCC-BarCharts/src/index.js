const gdpURL = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`;
const cycleURL = `https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json`

/* Cyclist Scatter Chart */
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(
        cycleURL
    );
    if (!response.ok) {
        const errorMessage = `An error has occured: ${response.status}`;
        throw new Error(errorMessage);
    }

    const data = await response.json()

    const width = 800;
    const height = 400;
    const padding = 60;

    const xScale = d3.scaleLinear()
        .domain([d3.min(data, (d) => d.Year - 1), d3.max(data, (d) => d.Year + 1)])
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain([
            d3.max(data, (d) => new Date(1000 * d.Seconds)),
            d3.min(data, (d) => new Date(1000 * d.Seconds))
        ])
        .range([height - padding, padding]);

    const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    const legend = d3.select("svg")
        .append("g")
        .attr("id", "legend-container")
        .append("g")
        .attr("id", "legend")
    legend.append("circle").attr("cx", 730).attr("cy", 144).attr("r", 6).style("fill", "orange")
    legend.append("circle").attr("cx", 730).attr("cy", 159).attr("r", 6).style("fill", "green")
    legend.append("text").attr("x", 475).attr("y", 145).text("Performances with doping allegations").style("font-size", "16px").attr("alignment-baseline", "middle")
    legend.append("text").attr("x", 455).attr("y", 160).text("Performances without doping allegations").style("font-size", "16px").attr("alignment-baseline", "middle")

    const tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", (d) => `dot ${d.Doping ? 'doping-dot' : 'clean-dot'}`)
        .attr("cx", (d) => xScale(d.Year))
        .attr("cy", (d) => yScale(new Date(d.Seconds * 1000)))
        .attr("r", 5)
        .attr("data-xvalue", (d) => d.Year)
        .attr("data-yvalue", (d) => new Date(d.Seconds * 1000))
        .on("mouseenter", (item) => {
            const itemData = item.target?.__data__
            tooltip.transition()
                .style("visibility", "visible")
                .text(`Name: ${itemData.Name}
                Nationality: ${itemData.Nationality}
                Time: ${itemData.Time}
                Year: ${itemData.Year}
                Alleged Doping: ${itemData.Doping ? 'Yes' : 'No'}
                `)
                .attr("data-year", itemData.Year)
        })
        .on("mouseout", () => tooltip.transition().style("visibility", "hidden"))

    const xAxis = d3.axisBottom(xScale).tickFormat((d) => d)
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'))

    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0,${height - padding})`)
        .call(xAxis)

    svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${padding},0)`)
        .call(yAxis)
})



/* GDP Bar Chart */
// const xPadding = 60;
// const yPadding = 20;
// const width = 800;
// const height = 450;

// const svgContainer = d3
//   .select('.chart-container')
//   .append('svg')
//   .attr('width', width + 50)
//   .attr('height', height + 50)
//   .attr('transform', `translate(${xPadding}, ${yPadding})`);

// const overlay = d3
//   .select('.chart-container')
//   .append('div')
//   .attr('class', 'overlay')
//   .style('opacity', 0);

// const tooltip = d3
//   .select('.chart-container')
//   .append('div')
//   .attr('id', 'tooltip')
//   .style('opacity', 0);

// svgContainer
//   .append('text')
//   .attr('transform', 'rotate(-90)')
//   .attr('x', -200)
//   .attr('y', xPadding + 20)
//   .attr('class', 'info')
//   .text('Gross Domestic Product');

// svgContainer
//   .append('text')
//   .attr('x', width / 2 + 120)
//   .attr('y', height + 50)
//   .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
//   .attr('class', 'info');

// const createXScale = (dataArr, minRange, maxRange) => {
//   const xMax = d3.max(dataArr.map(i => new Date(i[0])));
//   const xMin = d3.min(dataArr.map(i => new Date(i[0])));

//   xMax.setMonth(xMax.getMonth() + 3);
//   const xScale = d3
//     .scaleTime()
//     .domain([xMin, xMax])
//     .range([minRange, maxRange]);
//   return xScale;
// };
// const createYScale = (dataArr, minRange, maxRange) => {
//   const yMax = d3.max(dataArr.map(i => i[1]));
//   const yScale = d3
//     .scaleLinear()
//     .domain([0, yMax])
//     .range([minRange, maxRange]);
//   return yScale;
// };

// const createTooltip = (yearDate, gdp) => {
//   const year = new Date(yearDate).getFullYear();
//   const month = new Date(yearDate).getMonth();
//   const quarter =
//     month === 0 ? 'Q1' : month === 1 ? 'Q2' : month === 2 ? 'Q3' : 'Q4';

//   return ` ${year} ${quarter} <br>
//     ${gdp} Billion
//   `;
// };

// const handleHoverIn = (barWidth, barHeight, xPos, data) => {
//   const tooltipText = createTooltip(data[0], data[1]);

//   overlay
//     .transition()
//     .duration(50)
//     .style('width', `${barWidth}px`)
//     .style('height', `${barHeight}px`)
//     .style('opacity', '1')
//     .style('left', `${xPos}px`)
//     .style('top', `${height - barHeight}px`)
//     .style('transform', `translate(${xPadding}px, ${yPadding}px)`);

//   tooltip
//     .transition()
//     .duration(200)
//     .style('opacity', '0.9');

//   tooltip
//     .html(tooltipText)
//     .attr('data-date', data[0])
//     .style('left', `${xPos}px`)
//     .style('top', `${height - barHeight / 2}px`)

//     .style('transform', `translate(${xPadding}px, ${yPadding}px)`);
//     console.log(data)
// };

// const handleHoverOut = () => {
//   overlay
//     .transition()
//     .duration(50)
//     .style('opacity', '0');

//   tooltip
//     .transition()
//     .duration(200)
//     .style('opacity', '0');
// };

// const renderScale = (xAxisScale, yAxisScale) => {
//   const xAxisGroup = d3.axisBottom(xAxisScale);
//   const yAxisGroup = d3.axisLeft(yAxisScale);
//   svgContainer
//     .append('g')
//     .attr('id', 'x-axis')
//     .attr('transform', `translate(0, ${height})`)
//     .call(xAxisGroup);

//   svgContainer
//     .append('g')
//     .attr('id', 'y-axis')
//     .attr('transform', `translate(${xPadding}, 0)`)
//     .call(yAxisGroup);
// };

// const renderChart = (xScale, yScale, dataArr) => {
//   const barWidth = width / dataArr.length;
//   // yAxisScale range need to be inverted so it can start drawing from bottom to top
//   svgContainer
//     .selectAll('rect')
//     .data(dataArr)
//     .enter()
//     .append('rect')
//     .attr('data-date', d => d[0])
//     .attr('data-gdp', d => d[1])
//     .attr('class', 'bar')
//     .attr('x', d => xScale(new Date(d[0])))
//     .attr('y', d => height - yScale(d[1]))
//     .style('height', d => yScale(d[1]))
//     .style('width', barWidth)
//     .style('fill', '#f0f0f0')
//     .on('mouseover', d => {
//       const barHeight = yScale(d[1]);
//       const xPos = xScale(new Date(d[0]));
//       handleHoverIn(barWidth, barHeight, xPos, d);
//     })
//     .on('mouseleave', handleHoverOut);
// };

// d3.json(gdpURL)
//   .then(res => {
//     //  turn month into quarter
//     // find xMaxMin and yMaxMin
//     //  create xScale & yScale
//     // create <rect> using xScale & yScale

//     const xScale = createXScale(res.data, xPadding, width);
//     const yScale = createYScale(res.data, 0, height - yPadding);
//     const yAxisScale = createYScale(res.data, height, yPadding); //

//     renderChart(xScale, yScale, res.data);
//     renderScale(xScale, yAxisScale);
//   })
//   .catch(err => console.error(err.responsesd.data));
