// utility functions for the app

export default async function getRoadData(){
    const hasProperty = {};
    const res = [];
    await fetch('https://data.seattle.gov/resource/egc4-d24i.json')
        .then(res => res.json())
        .then(data => data.forEach(entry => {
            if(!hasProperty[entry.stationname]){
                res.push(entry);
            }
            if(hasProperty[entry.stationname] === undefined){
                hasProperty[entry.stationname] = true;
            } 
        }));
    return res;
}