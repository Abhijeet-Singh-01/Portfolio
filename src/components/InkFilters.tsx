/**
 * InkFilters — SVG filter pipeline for the liquid ink effect.
 *
 * Three distinct filter configurations:
 *  - #ink-fresh   : Active trail head with turbulent edges
 *  - #ink-pool    : Stabilized pool at chapter anchors
 *  - #ink-splatter: Micro-droplet field around active head
 *
 * These filters approximate physical ink soaking into textured paper.
 * They are applied sparingly via filter="url(#...)" on SVG elements.
 *
 * Performance note: filterUnits="userSpaceOnUse" restricts filter
 * computation to the element's bounding box, avoiding full-canvas
 * rasterization.
 */
export function InkFilters() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        {/* ── Fresh ink trail: turbulent, wet, irregular edges ── */}
        <filter
          id="ink-fresh"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="linearRGB"
        >
          {/* Procedural noise for organic edge distortion */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.035 0.06"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          {/* Displace ink edges using the noise field */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Slight blur to simulate capillary ink spread */}
          <feGaussianBlur in="displaced" stdDeviation="1.2" result="blurred" />
          {/* Alpha threshold to create ink density variation */}
          <feColorMatrix
            in="blurred"
            type="matrix"
            values="0 0 0 0 0.10
                    0 0 0 0 0.07
                    0 0 0 0 0.03
                    0 0 0 14 -5"
            result="thresholded"
          />
          <feComposite in="thresholded" in2="SourceGraphic" operator="in" />
        </filter>

        {/* ── Stabilized ink pool at chapter anchors ── */}
        <filter
          id="ink-pool"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="linearRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.025"
            numOctaves="4"
            seed="12"
            result="pool-noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="pool-noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
            result="pool-displaced"
          />
          <feGaussianBlur in="pool-displaced" stdDeviation="2.5" result="pool-blurred" />
          {/* Deeper alpha threshold for denser pool appearance */}
          <feColorMatrix
            in="pool-blurred"
            type="matrix"
            values="0 0 0 0 0.10
                    0 0 0 0 0.07
                    0 0 0 0 0.03
                    0 0 0 18 -6"
            result="pool-threshold"
          />
          <feComposite in="pool-threshold" in2="SourceGraphic" operator="in" />
        </filter>

        {/* ── Micro-splatter for ink head region ── */}
        <filter
          id="ink-splatter"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="linearRGB"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.09 0.12"
            numOctaves="2"
            seed="3"
            result="splat-noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="splat-noise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
            result="splat-displaced"
          />
          <feColorMatrix
            in="splat-displaced"
            type="matrix"
            values="0 0 0 0 0.10
                    0 0 0 0 0.07
                    0 0 0 0 0.03
                    0 0 0 22 -10"
          />
        </filter>

        {/* ── Paper texture overlay (light noise) ── */}
        <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
            result="paper-noise"
          />
          <feColorMatrix
            in="paper-noise"
            type="saturate"
            values="0"
            result="gray-noise"
          />
          <feBlend in="SourceGraphic" in2="gray-noise" mode="multiply" />
        </filter>
      </defs>
    </svg>
  );
}
