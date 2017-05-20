var $ = require('jquery');
var csv = require('csv');

module.exports = {

    tableData: {},
    currentDataIndex: 0,

    MakeTable: function(data){

        this.tableData = data;

        //Give the columns headers
        var html = `<table>
                        <tr>
                            <th>Load position</th>
                            <th>Magnitude</th>
                        </tr>
                        <tbody>`;
        
        // create rows with column 1 being number
        if(this.currentDataIndex > this.tableData.length) {
            this.currentDataIndex = this.tableData.length;
        }
        if(this.currentDataIndex < 0){
            this.currentDataIndex = 0;
        }

        if(this.tableData[this.currentDataIndex] != null) {

            for (var j = 0; j < data[this.currentDataIndex].length; ++j ) {
                html += '<tr>';

                html += '<td>' + parseInt(j+1) + '</td>';
                html += '<td>' + data[this.currentDataIndex][j] + '</td>';
                
                html += "</tr>";
            }
        }

        html += '</body></table>';

        //Send this data to table - uncomment to view table
        //$(html).appendTo($('#Table').empty());
    },

    resetChart: function() {

        var data = {
            labels: [],
            datasets: [
                {
                    label: "Location 1",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    spanGaps: false,
                },
                {
                    label: "Location 2",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(192,75,192,0.4)",
                    borderColor: "rgba(192,75,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(192,75,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(192,75,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    spanGaps: false,
                },
                {
                    label: "Location 3",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(192,192,75,0.4)",
                    borderColor: "rgba(192,192,75,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(192,192,75,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(192,192,75,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    spanGaps: false,
                },
                {
                    label: "Location 4",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(192,192,192,0.4)",
                    borderColor: "rgba(192,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(192,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(192,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    spanGaps: false,
                },
                {
                    label: "Location 5",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,75,75,0.4)",
                    borderColor: "rgba(75,75,75,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,75,75,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,75,75,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    spanGaps: false,
                },
                {
                    label: "Location 6",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,75,192,0.4)",
                    borderColor: "rgba(75,75,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,75,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,75,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    spanGaps: false,
                },
                {
                    label: "Location 7",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(192,75,75,0.4)",
                    borderColor: "rgba(192,75,75,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(192,75,75,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(192,75,75,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    spanGaps: false,
                },
                {
                    label: "Location 8",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,75,0.4)",
                    borderColor: "rgba(75,192,75,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,75,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,75,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [],
                    spanGaps: false,
                },
            ]
        };

        for(let i = 0 ; i < this.tableData.length; ++i) {

            data.labels[i] = i;
            data.datasets[0].data[i] = this.tableData[i][0];
            data.datasets[1].data[i] = this.tableData[i][1];
            data.datasets[2].data[i] = this.tableData[i][2];
            data.datasets[3].data[i] = this.tableData[i][3];
            data.datasets[4].data[i] = this.tableData[i][4];
            data.datasets[5].data[i] = this.tableData[i][5];
            data.datasets[6].data[i] = this.tableData[i][6];
            data.datasets[7].data[i] = this.tableData[i][7];
        }

        ctx = document.getElementById("myChart");
        myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false,
                        },
                        gridLines: {
                            display: false,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Frames'
                        }
                    }]
                }
            }
        });
    }
};