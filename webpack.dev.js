/*
*
*	Gestion des chemins
*
*/

//module Node.js pour la gestion des chemins d'accès au fichier
const path = require('path');

//plugin webpack de génération de fichier HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');

//chemin de l'évenement en cours
const relativePath = "./" + path.relative(__dirname, process.env.INIT_CWD);



/*
*
*	Configuration de Webpack
*
*/

module.exports = function(env) {
	return {
		//defini comment sont générés les source-map (https://webpack.js.org/configuration/devtool/)
		devtool: 'eval-cheap-module-source-map',

		//fichier principal : point d'entrée du projet. C'est ce fichier qui détermine le contenu du bundle généré.
		entry: relativePath + '/index.js',

		//setup du serveur local avec live-reloading
		devServer: {
			port: 8080,

			//défini le dossier racine du local.
			//sert pour définir le chemin des fichiers non inclus via "entry"; par exemple les fichiers inclus via <img>, <script> ou <link> dans un template css (ces fichiers ne sont pas inclus dans le bundle)
			contentBase: path.join(__dirname, "_global"),
		},

		//objet qui sert à définir le loader utilisé pour chaque type de ressource
		module: {
			rules: [
				{
					test: /\.html$/,
					use: [
						{
							//transforme les caractères spéciaux en entité HTML
							loader: path.resolve(__dirname, '_global/loaders/requirePath.js'),
							options : {
								path : path.basename(relativePath)
							}
						},
						{
							loader: 'html-loader',
							options: {
								//executer les includes (${require()})
								interpolate : true,
								//lui dire où regarder pour les fichiers à traiter
								attrs: ['img:src', 'img:data-src'],
								//indique le chemin de base des fichiers (images, css, ...) à utiliser en local
								root: path.resolve(__dirname, '_global/structure_site')
							},
						}
					]
				},
				{
					test: /\.(scss|css)$/,
					use: [
						{
							//permet d'inclure le css dans une balise <style> afin de permettre le live-reloading du css
							loader: "style-loader",
							options: {
								sourceMap: true
							}
						},
						{
							//loader de base (j'ai pas trop compris ce qu'il fait mais il est nécéssaire)
							loader: "css-loader",
							options: {
								sourceMap: true
							}
						},
						{
							//compile le Sass en CSS
							loader: "sass-loader",
							options: {
								outputStyle: 'expanded',
								sourceMap: true,
								sourceMapContents: true
							}
						}
					]
				},
				{
					test: /\.svg$/,
					//on sépare en 2 cas : les svgs inline et ceux dans les src des balises <img>
					oneOf: [
						{
							resourceQuery: /inline/,
							use: {
								//inclus les svgs en inline (ses balises)
								loader: 'raw-loader',
							}
						},
						{
							use: [
								{
									//génère les fichiers + remplace le chemin par celui du fichier généré
									loader: 'file-loader',
									options: {}
								}
							]
						}
					]
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							//génère les fichiers + remplace le chemin par celui du fichier généré
							loader: 'file-loader',
							options: {}
						}
					]
				},
				{
					test: /\.(woff|woff2)$/,
					use: [
						{
							//génère les fichiers + remplace le chemin par celui du fichier généré
							loader: 'file-loader',
							options: {}
						}
					]
				}
			],
		},

		//objet qui sert à définir les plugins qui vont intervenir en fin de compilation afin de traiter les fichiers générés
		plugins: [
			//plugin de génération de fichier HTML (gère les includes HTML présent)
			new HtmlWebpackPlugin({
				template: (env.sim == "true")? './_global/structure_site/template_sim.html' : './_global/structure_site/template_desk.html',
				inject: true
			})
		]
	}
};
