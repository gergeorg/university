const {src, dest, parallel, series, watch} = require('gulp')
const browserSync = require('browser-sync').create()
const fileInclude = require('gulp-file-include')
const del = require('del')
const sass = require('gulp-sass')
const autoPrefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const groupMedia = require('gulp-group-css-media-queries');
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const image = require('gulp-image')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const svgSprite = require('gulp-svg-sprite')
const htmlMin = require('gulp-htmlmin')


//функция по сбору/объединению html файлов
const htmlInclude = () => {
    return src('./src/*.html')
        .pipe(fileInclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(dest('./app'))
        .pipe(browserSync.stream())
}

//функция для преобразования из scss в css и минификации css
const stylesSCSS = () => {
    return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(groupMedia())
    .pipe(autoPrefixer({
        cascade: true
    }))
    .pipe(dest('./app/css'))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream())
}

//функция для сбора в один файл стилей библиотек
const stylesVendor = () => {
    return src('./src/scss/vendor/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('vendor'))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream())
}

//функция для объединения js файлов, минимизации, добавление префиксов для древних браузеров
const js = () => {
    return src('./src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(dest('./app/js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify().on('error', notify.onError))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./app/js'))
        .pipe(browserSync.stream())
}

//функция для объединения js файлов библиотек, минимизации
const jsVendor = () => {
    return src('./src/js/vendor/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(dest('./app/js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./app/js'))
        .pipe(browserSync.stream())
}

//функция по конвертации ttf в woff и woff2
const fonts = () => {
    src('./src/fonts/**.ttf')
        .pipe(ttf2woff())
        .pipe(dest('./app/fonts/'))
    return src('./src/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('./app/fonts/'))
}

//функция по созданию svg спрайтов
const svgSprites = () => {
    return src('./src/img/svg/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('./app/img'))
}

//функция переноса картинок из scr в app (без сжатия)
const imgToApp = () => {
    return src(['./src/img/**/*.jpg', './src/img/**/*.jpeg', './src/img/**/*.png', './src/img/*.svg'])
        .pipe(dest('./app/img'))
}

//функция переноса прочих файлов в корень app
const resources = () => {
    return src('./src/resources/**')
        .pipe(dest('./app'))
}

//функция для очистки папки app
const clean = () => {
    return (del(['./app/*']))
}

//минимизация html для build
const htmlMinify = () => {
    // return src('app/**/*.html')
    return src('./app/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('app'))
}

//функция для build css
const stylesBuild = () => {
    return src('./src/scss/**/*.scss')
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(groupMedia())
    .pipe(autoPrefixer({
        cascade: true
    }))
    .pipe(dest('./app/css'))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(dest('./app/css'))
}

//build функция для сбора в один файл стилей библиотек
const stylesVendorBuild = () => {
    return src('./src/scss/vendor/*.css')
    .pipe(concat('vendor'))
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(dest('./app/css'))
}

//функция для build js
const jsBuild = () => {
    return src('./src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(dest('./app/js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify().on('error', notify.onError))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./app/js'))
}

//build функция для объединения js файлов библиотек, минимизации
const jsVendorBuild = () => {
    return src('./src/js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(dest('./app/js'))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./app/js'))
}

//функция для минимизации изображений
const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.jpeg',
        'src/img/**/*.png',
        'src/img/*.svg'
    ])
    .pipe(image())
    .pipe(dest(('./app/img')))
}

//функция browser sync
const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    })

    watch('./src/**/*.html', htmlInclude)
    watch('./src/scss/**/*.scss', stylesSCSS)
    watch('./src/scss/vendor/*.css', stylesVendor)
    watch('./src/js/**/*.js', js)
    watch('./src/js/vendor/*.js', jsVendor)
    watch('./src/img/**/*.jpg', imgToApp)
    watch('./src/img/**/*.jpeg', imgToApp)
    watch('./src/img/**/*.png', imgToApp)
    watch('./src/img/*.svg', imgToApp)
    watch('./src/img/*.svg', svgSprites)
    watch('./src/resources/**', resources)
    watch('./src/resources/**.ttf', fonts)

}

exports.watchFiles = watchFiles;

exports.default = series(clean, parallel(htmlInclude, stylesSCSS, stylesVendor, js, jsVendor, imgToApp, fonts), watchFiles);

exports.build = series(clean, htmlInclude, jsBuild, jsVendorBuild, stylesBuild, stylesVendorBuild, resources, images, fonts, svgSprites, htmlMinify, watchFiles);

