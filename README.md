# SVG Optimizer API


A lightweight Node.js backend that exposes a single endpoint to optimize SVG files using [SVGO](https://github.com/svg/svgo).
Please consider check this amazing open-source project (☆ω☆)

---

## What It Does? ( ô ‸ ō )?

This API receibes raw SVG content through a POST request and return an optimized SVG.
It applies SVGO plugins to reduce file size, maintaining visual integrity (｡•̀ᴗ-)✧

---

## Features ☝️(˶⎚⤙⎚˶)

- Safe default optimizations via `preset-default`
- Retains `viewBox` for responsiveness
- Shortens hex codes and color names
- Simplifies numeric values with controlled precision
- Sorts SVG attributes alphabetically
- Removes unnecessary dimensions and scripts
- Removes `xmlns` unless explicitly needed

---

## How It Works? (╭ರ_•́)

The core of the optimization uses SVGO’s multipass engine and the following plugins:

- `preset-default` (with key overrides to preserve visual fidelity)
- `convertColors`, `cleanupNumericValues`, `sortAttrs`
- `removeDimensions`, `removeScriptElement`, `removeXMLNS`

These plugins work together to:
- Minimize output size
- Preserve viewBox and critical attributes
- Clean and normalize formatting

---

## Error Responses 	Σ(°△°|||)︴

| Status Code | Message                                        |
|-------------|------------------------------------------------|
| `400`       | `SVG content is required in the request body.` |
| `405`       | `Method Not Allowed. Use POST.`                |
| `500`       | `Failed to optimize SVG.`                      |

---

## Project Structure ( ￣ー￣)φ__

```
.
├── api
│   └── optimize.js   # The main handler for the API
├── package.json
└── README.md
```

---

## Dependencies (つ✧ω✧)つ

- [`svgo`](https://www.npmjs.com/package/svgo)

Install it with:

```bash
npm install svgo
```

---

## License ᓚ₍ ^. .^₎

MIT — feel free to use and modify.