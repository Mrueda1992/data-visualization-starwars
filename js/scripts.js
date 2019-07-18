/*

Webs de interés:
    - https://www.chartjs.org/
    - https://d3js.org/
    - https://experiments.withgoogle.com/chrome/globe
    - https://graphoverflow.com/graphs/3d-periodic-table.html
    - https://www.awwwards.com/websites/data-visualization/

*/


let pages = 2, urls = []

for (let i = 1; i <= pages; i++) {
    urls.push(`https://swapi.co/api/people/?page=${i}`)
}

Promise.all(urls.map(
    url =>
        fetch(url)
            .then(res => res.json())
            .catch(err => console.log("Ops! Error al canto", err))
            .then(data => data.results)
))
    .then(allResults => {

        const characters = allResults.flat()
        showBarChart('q1', characters, 200)
        showDoughnutChart('q2', characters, 200)
        showPolarChart('q3', characters, 200)
        showMixedChart('q4', characters, 200)

    })





const showBarChart = (id, data, height) => {

    height ? document.getElementById(id).height = height : null

    new Chart(id, {
        type: 'horizontalBar',
        data: {
            labels: data.map(character => character.name),
            datasets: [{
                label: 'Movies made',
                data: data.map(character => character.films.length),
                borderColor: 'rgba(0, 50, 250, .7)',
                backgroundColor: 'rgba(0, 250, 50, .2)',
                borderWidth: 1
            }]
        }
    })
}





const showDoughnutChart = (id, data, height) => {

    height ? document.getElementById(id).height = height : null

    new Chart(id, {
        type: 'doughnut',
        data: {
            labels: ['Female characters', 'Male characters'],
            datasets: [{
                label: 'Gender rate',
                data: [
                    data.filter(character => character.gender == 'female').length,
                    data.filter(character => character.gender == 'male').length
                ],
                borderColor: 'rgba(0, 50, 250, .7)',
                backgroundColor: [
                    'rgba(0, 50, 250, .2)',
                    'rgba(0, 250, 50, .2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                position: 'left'
            }
        }
    })
}





const showPolarChart = (id, data, height) => {

    height ? document.getElementById(id).height = height : null

    new Chart(id, {
        type: 'polarArea',
        data: {
            labels: ['Orange eyes', 'Brown eyes', 'Yellow eyes', 'Red eyes', 'Black eyes'],
            datasets: [{
                data: [
                    data.filter(character => character.eye_color.includes('orange')).length,
                    data.filter(character => character.eye_color.includes('brown')).length,
                    data.filter(character => character.eye_color.includes('yellow')).length,
                    data.filter(character => character.eye_color.includes('red')).length,
                    data.filter(character => character.eye_color.includes('black')).length
                ],
                backgroundColor: [
                    'rgba(0, 50, 250, .2)',
                    'rgba(0, 250, 50, .2)',
                    'rgba(0, 50, 250, .2)',
                    'rgba(0, 250, 50, .2)',
                    'rgba(0, 50, 250, .2)'
                ]
            }]
        },
        options: {
            legend: {
                position: 'left'
            }
        }
    })
}




const showMixedChart = (id, data, height) => {

    height ? document.getElementById(id).height = height : null

    new Chart(id, {
        type: 'bar',
        data: {
            labels: data.map(character => character.name),
            datasets: [{
                label: 'Height',
                data: data.map(character => character.height),
                borderColor: 'rgba(0, 50, 250, .7)',
                backgroundColor: 'rgba(0, 250, 50, .2)',
                borderWidth: 1
            },
            {
                label: 'Mass',
                data: data.map(character => character.mass),
                borderColor: 'rgba(0, 50, 250, 1)',
                borderWidth: 1,
                type: 'line'
            }]
        }
    })
}