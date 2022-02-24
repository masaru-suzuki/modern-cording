import mozjpeg from "imagemin-mozjpeg";
import keepfolder from "imagemin-keep-folder";
import pngquant from "imagemin-pngquant";
import gifsicle from "imagemin-gifsicle";
import svgo from "imagemin-svgo";
import webp from "imagemin-webp";

keepfolder(["src/img/**/*.{jpg,png,gif,svg}"], {
  plugins: [
    mozjpeg({
      quality: 85,
    }),
    pngquant({
      quality: [0.7, 0.8],
    }),
    gifsicle(),
    svgo(),
  ],
  use: [webp({})],
  replaceOutputDir: (output) => {
    return output.replace(/img\//, "../public/img/");
  },
});
