// INIT
window.addEventListener("load", (event) => {
    let gentryData = {}
    var gentryList = document.getElementById("gentry")

    fetch("./data.json")
        .then(response => response.json())
        .then(data => {
            gentryData = data["gentry"]
            generateGentryInfoBlock()
        })
        .catch(error => console.error("Error:", error))
    

    function generateGentryInfoBlock () {
        for(const [key,value] of Object.entries(gentryData)){
            const child = document.createElement('div')
            const gentryName = document.createElement('h3')
            const progressbar = document.createElement('div')
            const actualProgress = document.createElement('div')
            const millionCount = document.createElement('p')

            // actualProgress.style.setProperty('background-color','blue')
            millionCount.innerText = `I've made ${value["MILLION-COUNT"]} million since you loaded this page 🙃`

            actualProgress.style.setProperty('width','0px')
            
            progressbar.className = "progress"
            progressbar.appendChild(actualProgress)
            
            gentryName.innerText = key

            child.id = key
            child.appendChild(gentryName)
            child.appendChild(millionCount)
            child.appendChild(progressbar)
            // child.textContent = value["TSL"]
            gentryList.appendChild(child)
        }
    }

    function updateGentryInfoBlock () {
        for(const [key,value] of Object.entries(gentryData)){
            const gentry = document.getElementById(key)
            // gentry.textContent = value["TSL"]
            let progress = gentry.querySelector('.progress').querySelector('div')
            console.log(key,`${value["TSL"]}/1000000`)
            if(value["TSL"] > 1000000){
                value["TSL"] = value["TSL"] - 1000000
                value["MILLION-COUNT"] += 1
                let millionCount = gentry.querySelector("p")
                if(key === "The working class"){
                    millionCount.textContent = `We've made ${value["MILLION-COUNT"]} million since you loaded this page! Think of all the ways we could make life better for everyone.`
                    progress.style.setProperty('background-color','lightgreen')
                } else {
                    millionCount.textContent = `I've made ${value["MILLION-COUNT"]} million since you loaded this page 🙃`
                }
            }
             progress.style.setProperty('width',`${value["TSL"] / 1000000 * 100}%`)
        }
    }
        
    updateTrackers = () => {
        for(const [key,value] of Object.entries(gentryData)){
            // console.log(value["IPS"])

            gentryData[key]["TSL"] += value["IPS"]
            // console.log(gentryData[key])
            updateGentryInfoBlock()
        }
    }

    setInterval(updateTrackers, 1000)
})