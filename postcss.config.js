module.exports = {
    plugins: [
        //"postcss-syntactic-sugar",
		//"postcss-non-standard",
		// ...
		[
			"postcss-preset-env",
			{
				autoprefixer: { 
                    grid: 'autoplace',
                },
			},
		],
    ],
};