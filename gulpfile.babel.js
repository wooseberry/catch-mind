import gulp from "gulp";
import babel from "gulp-babel";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import uglify from "gulp-uglify";
import autoprefixer from "gulp-autoprefixer";
import gulpClean from "gulp-clean";

const sass = gulpSass(nodeSass);
//paths
const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss",
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js",
  },
};

//clean(plugin)
async function clean() {
  gulpClean(["src/static"]);
}

//JS변환
const js = () => 
  gulp
  .src(paths.js.src) //변환할 JS파일경로 지정
  .pipe(babel({
    "presets": [
      [
        "@babel/preset-env",
        {
          "modules": false
        }
      ]
    ]
  }))
  .pipe(uglify()) // 파일압축
  .pipe(gulp.dest(paths.js.dest))

//SCSS변환
const styles = () => 
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer({
      cascade : false
    }))
    .pipe(gulp.dest(paths.styles.dest))


//Watch
    const watchFiles = () => {
      gulp.watch(paths.styles.watch, styles);
      gulp.watch(paths.js.watch, js);
    };

const dev = gulp.series(clean,styles,js, watchFiles);
export const build = gulp.series(clean, styles,js);

export default dev;