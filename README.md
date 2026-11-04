# Venture 3D Studio — Mission 2

A browser-based, local-first product modeling studio built for Olivia’s Smart Closet concept. Uses Vite, Three.js, OrbitControls, TransformControls, GLTFExporter/Loader and JSZip. No paid services or API keys.

## Use the studio

1. Open the published studio. The editable Smart Closet has 53 components.
2. Drag to orbit, scroll to zoom, right-drag to pan, or choose **Pan** for left-drag panning. Use Front, Side, Top, Isometric, Fit view and the perspective/orthographic toggle.
3. Select a component in the viewport or scene list. Use Move / Rotate / Resize gizmos, or type X/Y/Z values and click **Apply dimensions & transform**. Units are meters; rotation is degrees.
4. Change color, material roughness, metallic finish or opacity. Uploaded images can be applied as surface textures with repeat and offset controls.
5. **Save project** saves in this browser’s IndexedDB. Refresh restores that saved version. Under **Project files**, download the editable JSON backup for another device; browser storage is not a permanent backup.
6. **Confirm model** validates a real GLB by loading it again, embeds textures, saves a confirmed project snapshot and prepares a ZIP. Click **Download confirmed ZIP**. Subsequent edits require a new confirmation.
7. Carry **Venture_3D_Confirmed_Handoff.zip** into Mission 3. It contains model.glb, model-manifest.json, project.json, preview.png and README.txt. Do not substitute the preview image for the model.

The independent viewer is at `viewer.html`. It loads only the shipped GLB, independently of the studio’s procedural scene.

## Development

Use Node 22 and pnpm 11 (or later compatible versions):

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

The Vite base path is `/venture-3d-studio/`. The Pages workflow builds on every push to main. In repository **Settings → Pages**, use **GitHub Actions** as the publishing source.

## Model and schema

The concept image was interpreted during development into a stylized cabinet, garments, folded linens, mirror, inventory sensors, brass pulls, warm light strip and wall dashboard. Approximate cabinet height is 2.3 m. Overall bounds include the opened door and separate dashboard. This is an editable concept prototype, not engineering/CAD reconstruction. Mirror and dashboard content are illustrative textures; their depicted software features do not run inside the model.

Editable JSON schema `1.0`: project name, modelType, description, parts, references, background, lighting and camera preset. Each part carries an ID, name, geometry type, XYZ position, Euler rotation in radians, XYZ scale/dimensions, and material properties. Optional textures are data URLs, so backups are portable. Reference images also use data URLs. Imported GLBs use serialized BufferGeometry.

Handoff manifest schema `1.0`: handoffVersion and confirmedAt are ISO timestamps; projectName, modelName, modelType and description identify the design. dimensions are world-space axis-aligned width/height/depth in meters. coordinateSystem is right-handed Y-up. camera includes position, target, projection and FOV. background and lighting record presentation choices. files contains relative package filenames. sha256 is the lowercase SHA-256 digest of model.glb. hotspots is an optional array, empty by default.

## Scope and limitations

- Eight editable starting models: closet, bottle, box, bag, mascot, mug merchandise, room and sculpture.
- Core creation and editing run locally in a modern WebGL browser. First page load requires the hosted assets; typography has a system-font fallback.
- GLB import supports this studio’s static mesh exports. Arbitrary external models with animations, skins, multi-material meshes or advanced extensions are outside the supported round-trip scope.
- Transparency is an approximate material effect. The mirror is an illustrative screen, not a real-time reflection. Templates are stylized, not manufacturing-ready solids.
- Uploaded images are capped at 20 MB and resized to a maximum 1536-pixel side. Texture mapping follows each mesh’s UVs; box surfaces share the same image.
- Saving is explicit, not continuous autosave. Undo/redo covers design edits in the current session.
- Confirmation generates a snapshot; it does not publish or modify Mission 1’s website.
