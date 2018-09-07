/*
*
*	Gestion des chemins
*
*/

//module Node.js pour la gestion des chemins d'accès au fichier
const path = require('path');

//chemin de l'évenement en cours
const relativePath = "./" + path.relative(__dirname, process.env.INIT_CWD);

//fichier de configuration de l'évenement
const config = require(relativePath + '/webpack.config.js');
const now = new Date();

//chemin du dossier FTP
const stagingPath = "/content/static/bcom/evenements/"+ ((config.fixedYearPath != "")? config.fixedYearPath : now.getFullYear()) +"/"+ ((config.fixedMonthPath != "")? config.fixedMonthPath : ((now.getMonth()+1 < 10)? "0"+(now.getMonth()+1) : (now.getMonth()+1) ) ) +"_"+path.basename(process.env.INIT_CWD);

//répertoire de destination du "build"
const buildPath = path.resolve(path.relative(__dirname, process.env.INIT_CWD), 'dist');


/*
*
*	Ajout des plugins necessaires
*
*/

//module Node.js
const glob = require('glob-all');

//plugin de suppression de suppression de dossier/fichier
const CleanWebpackPlugin = require('clean-webpack-plugin');

//plugin webpack de génération de fichier HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');

//plugin de concaténation de fichiers CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//plugin de minification de CSS + CSS-nano
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//plugin de supression de CSS unitile
const PurgecssPlugin = require('purgecss-webpack-plugin');

//plugin pour supprimé la balise <head> créer par le HTML
const RemoveHeadTag = require(path.resolve(__dirname, '_global/loaders/removeHeadTag.js'));

//plugin de mis en cache pour un build plus rapide
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

//plugin pour changé les permission sur les fichiers
// const PermissionsOutputPlugin = require('webpack-permissions-plugin');

//plugin d'upload des fichiers sur le FTP
// const WebpackFtpUpload = require('webpack-ftp-upload-plugin');

//plugin de concaténation de fichiers CSS
const whitelist = require(path.resolve(__dirname, "_global/loaders/whitelist.js"));


/*
*
*	Configuration de Webpack
*
*/

module.exports = {
    //defini comment sont générés les source-map (https://webpack.js.org/configuration/devtool/)
    devtool: 'source-map',

    //fichier principal : point d'entrée du projet. C'est ce fichier qui détermine le contenu du bundle généré.
    entry: relativePath + '/index.js',

    //défini le com et le chemin du fichier final (rataché à "entry")
    output: {
        filename: '[name].min.js',
        path: buildPath,
        publicPath : stagingPath
    },

    //objet qui sert à définir le loader utilisé pour chaque type de ressource
    module: {
        rules: [
            {
                //compile le js moderne (ES6) en js compréhensible par tout les navigateur
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        //regroupe les fichiers CSS/SCSS
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        //loader de base (j'ai pas trop compris ce qu'il fait mais il est nécéssaire)
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // loader d'auto-préfix
                        loader: "postcss-loader"
                    },
                    {
                        //compile le Sass en CSS
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            },
			{
                test: /\.(png|jpg)$/,
                //on sépare en 2 cas : les images lozaloaded et les autres
                oneOf: [
                    {
                        resourceQuery: /lazy/,
                        use: [
                            {
                                //création d'un placeholder pour chaque image
                                loader: 'image-trace-loader',
                                options : {
                                    turdSize : 50000,
                                    alphaMax:0.2,
                                    color: "COLOR_TRANSPARENT"
                                }
                            },
                            {
                                //génère les fichiers + remplace le chemin par celui du fichier généré
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'assets/',
                                    publicPath: stagingPath+"/assets"
                                }
                            },
                            {
                                //optimisation des images
                                loader: 'img-loader',
                                options: {
                                    plugins: [
                                        require('imagemin-mozjpeg')({
                                            progressive: true,
                                            arithmetic: false,
                                            quality : 80
                                        }),
                                        require('imagemin-pngquant')({
                                            floyd: 0.5
                                        })
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        use: [
                            {
                                //génère les fichiers + remplace le chemin par celui du fichier généré
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'assets/',
                                    publicPath: stagingPath+"/assets"
                                }
                            },
                            {
                                //optimisation des images
                                loader: 'img-loader',
                                options: {
                                    plugins: [
                                        require('imagemin-mozjpeg')({
                                            progressive: true,
                                            arithmetic: false,
                                            quality : 80
                                        }),
                                        require('imagemin-pngquant')({
                                            floyd: 0.5
                                        })
                                    ]
                                }
                            }
                        ]
                    }
                ]
			},
			{
				test: /\.(gif)$/,
				use: [
					{
						//génère les fichiers + remplace le chemin par celui du fichier généré
						loader: 'file-loader',
						options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                            publicPath: stagingPath+"/assets"
                        }
					}
				]
			},
            {
                test: /\.(woff|woff2)$/,
                use: [
                    {
                        //génère les fichiers + remplace le chemin par celui du fichier généré
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: stagingPath+"/fonts"
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /inline/,
                        use: {
                            //inclus les svgs en inline (ses balises)
                            loader: 'raw-loader',
                        }
                    },
                    {
                        use:[
                            {
                                //compile les fichiers en base64 si inférierur à 5ko, sinon le laisse tel quel
                                loader: 'svg-url-loader',
                                options: {
                                    limit: 5000,
                                    noquotes : true,
                                    name: '[name].[ext]',
                                    outputPath: 'assets/',
                                    publicPath: stagingPath+"/assets"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            //lui dire où regarder pour les fichiers à traiter
                            attrs: ['img:src', 'img:data-src', 'link:href'],
                            //executer les includes (${require()})
                            interpolate : true,
                            minimize: true,
                            //retirer les quotes pose problème avec les svg générés en base 64
                            removeAttributeQuotes : false
                        },
                    },
                    {
                        //transforme les caractères spéciaux en entité HTML
                        loader: path.resolve(__dirname, '_global/loaders/entities.js')
                    },
                    {
                        //modifie les balise <img> pour le lazyload (mise en place du placeholder)
                        loader: path.resolve(__dirname, '_global/loaders/src.js')
                    }
                ]
            }
        ]
    },

    //objet qui sert à définir les plugins qui vont intervenir en fin de compilation afin de traiter et générer les fichiers
    plugins: [

        //plugin de mis en cache pour un build plus rapide
        new HardSourceWebpackPlugin(),

        //plugin de génération de fichier HTML (gère les includes HTML présent)
        new HtmlWebpackPlugin({
            template: relativePath + '/index.html',
            // Injecte le bundle à la fin du fichier (avant </body>)
            inject: "body"
        }),

        //supprime totalement le dossier "dist" avant qu'il soit re-généré
        new CleanWebpackPlugin(buildPath),

        //plugin de génération de fichier CSS
        new MiniCssExtractPlugin({
            filename: "css/[name].min.css",
            publicPath : stagingPath+"/css"
        }),

        //plugin de supression de CSS unitile
        new PurgecssPlugin({
			//paths: glob.sync(path.join(process.env.INIT_CWD, 'index.html')),
			paths: glob.sync([
				path.join(process.env.INIT_CWD, '*.html'),
				path.join(process.env.INIT_CWD, 'includes/*.html')
			]),
            whitelist : whitelist,
            whitelistPatterns : [
                /^wl-/, // class ou id qui commence par "wl-"
				/^slider/, //class ou id qui commence par "slider"
				/^sidebar/
            ]
        }),

        //plugin de minification du CSS
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                map: {
                    inline: false
                },
                discardComments: {
                    removeAll: true
                }
            }
        }),

        //supprime la balise <head> qui englobe les fichiers CSS
        new RemoveHeadTag()
    ]
};
