const glob = require('glob');

const getDirectories = function(src, ext, callback) {
    glob(src + '/**/*' + ext, callback);
}

//Récupérer les fichiers HTML

const htmlFiles = getDirectories('../src/app/view', '.html', (err, res) => {
    if(err){
        console.log('Error', err);
    } else {
        console.log("html : " + res);
        resource.html = res;
        return res;
    }
})

//Récupérer les fichiers JS

const jsFiles = getDirectories('../src/app/', '.js', (err, res) => {
    if(err){
        console.log('Error', err);
    } else {
        console.log("js : " + res);
        resource.js = res;
        return res;
    }
})

//Récupérer les fichiers Images

const imgFiles = getDirectories('../assets/img/', '.*', (err, res) => {
    if(err){
        console.log('Error', err);
    } else {
        console.log("img : " + res);
        resource.img = res;
        return res;
    }
})

const resource = {
    html:htmlFiles,
    js:jsFiles,
    img:imgFiles
}

//console.log(resource);
