# IFrameUIServer

Note: this `IFrameUIServer` directory is not self-contained - it reaches out in 
nearby directories `browser_js`, `shared_js` and `shared_js_jsx`.

If you want to copy this server, make sure to copy all the necessary dependencies too
```
	IFrameUIServer
	browser_js
	shared_js
	shared_js_jsx
```
`browser_js` is specific for Node/js

The `shared_...` directories contain code that is also used by the CEP panel JS code and/or the ExtendScript code.