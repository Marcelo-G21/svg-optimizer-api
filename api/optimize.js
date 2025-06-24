//I'm using svgo here to make the optimization
//If you want to implement it directrly to your code, please consider to check the repository: https://github.com/svg/svgo
const { optimize } = require("svgo");

// Export the API handler (im using it for Vercel)
module.exports = async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  let svgContent = "";
  try {
    svgContent = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", reject);
    })
  } catch (e) {
    return res.status(400).json({ error: "Invalid body received"});
  }

  if (!svgContent || typeof svgContent !== "string") {
    return res
      .status(400)
      .json({ error: "SVG content is required in the request body." });
  }

  try {
    //Here we have the main thing, the optimization for SVG with SVGO
    //We'll use a custom plugin configuration ദ്ദി ˉ꒳ˉ )✧
                                        //And here comes the ✧c o n f i g✧ (∩ᄑ_ᄑ)⊃━☆ﾟ*･｡*･:≡( ε:)
    const result = optimize(svgContent, {
      multipass: true,                  // Run multiple optimization passes
      floatPrecision: 1,               // Limit decimal precision to reduce file size
      plugins: [
        "preset-default",                         // Use the default plugin set
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false,               // Keep viewBox to preserve scaling
              removeUnknownsAndDefaults: false,   // Retain unknown/default attributes
              removeUselessStrokeAndFill: false,  // Keep stroke/fill even if considered useless
              cleanupIDs: false,                  // Do not minify or remove IDs
              convertShapeToPath: true,           // Convert basic shapes to <path>
              moveElemsAttrsToGroup: true,        // Move common attributes to <g> tags
              moveGroupAttrsToElems: true,        // Push group attributes down to elements
              collapseGroups: true,               // Collapse unnecessary groups
            },
          },
        },
        {
          name: "convertColors",
          params: {
            shorthex: true,       // Shorten hex codes if there are repeats (e.g. #ffffff -> #fff)
            shortname: true,      // Use short color names where possible
          },
        },
        {
          name: "cleanupNumericValues",
          params: {
            floatPrecision: 1,    // Again ensure decimals are minimal
          },
        },
        {
          name: "sortAttrs",
          params: {
            xmlnsOrder: "alphabetical", // Order SVG attributes alphabetically
          },
        },
        "removeDimensions",         // Remove width/height to make SVG responsive
        "removeScriptElement",      // Remove any <script> tags for security
        "mergePaths",               // Merge similar rotes to reduce nodes
        "collapseGroups",           // Remove innecesary groups (e.g. <g>)
        "convertPathData",          // Simplify d attributes in <path>
        "convertTransform",         // Reduces transform complexity
        "removeEmptyAttrs",         //Removes worthless attributes
        "removeEmptyContainers",    //Removes empty elements
        "sortAttrs",                //Sort atributesfor optimal GZIP compression
        "sortDefChildren",          //Soort nodes for optimal GZIP compression
      ],
    });

    // Here we return the optimized SVG (｡•̀ᴗ-)✧ well... if everything goes well (O_O;)
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(result.data);
  } catch (error) {
    console.error("Error optimizing SVG:", error);
    res.status(500).json({ error: "Failed to optimize SVG." });
  }
};

