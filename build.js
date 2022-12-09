import path from 'path'
import esbuild from 'esbuild'
import copyStaticFiles  from 'esbuild-copy-static-files'
import clear from 'esbuild-plugin-clear';

const __dirname=path.resolve()
const srcDir=path.resolve(__dirname,'src')
const base_out='/mnt/c/Users/toufik/Downloads/dist/'
const jsFiles=['popup.ts', 'background.ts','content.ts'].map((file_path)=>{return path.resolve(srcDir,'js',file_path)})
const staticFiles=path.resolve(srcDir,'static')

const sharedOptions={
    entryPoints: jsFiles,
    bundle: true,
    write: true,
    splitting: true,
    format:'esm',
    chunkNames: 'chunks/[name]-[hash]',
    outdir: path.resolve(base_out,'js'),
    //force:true,
    plugins: [
        clear(path.resolve(base_out)),
        copyStaticFiles({
            src: staticFiles,
            dest:base_out,}),
    ],
}

const devOptions={
    ...sharedOptions,
    incremental:true,
    sourcemap: 'external',
    watch:{
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error)
            else console.log('watch build succeeded:', result)
        },
    },
}

const buildOptions={
    ...sharedOptions,
    minify:true,
}

const mode = process.argv.slice(2)[0];
switch(mode){
    case 'dev': esbuild.build(devOptions).then(result => {  console.log('start dev') });
        break;
    case 'build': esbuild.build(buildOptions).then(result => { console.log('build completed') });
        break;
    default:console.log("unknown mode/parameters");
}
