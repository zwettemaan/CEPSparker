//
// Simple image handler
//

$$SHORTCODE$$.placeImage = function(imagePath, imageURL, width, height) {

	do {

		var doc = app.activeDocument;
		if (! (doc instanceof Document)) {
            $$SHORTCODE$$.logWarning("$$SHORTCODE$$.placeImage: no active document");
			break;
		}

		var imageFile = File(imagePath);
		if (! imageFile || ! imageFile.exists) {
            $$SHORTCODE$$.logError("$$SHORTCODE$$.placeImage: no image");
			break;
		}

		var target;
		if (app.selection && app.selection.length > 0) {
			target = app.selection[0];
		}
		else {
			target = doc.rectangles.add();
		}

		var savedHorizontalMeasurementUnits = doc.viewPreferences.horizontalMeasurementUnits;
		doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.Points;
		var savedVerticalMeasurementUnits = doc.viewPreferences.verticalMeasurementUnits;
		doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.Points;
		target.geometricBounds = [ 
			target.geometricBounds[0],
			target.geometricBounds[1],
			target.geometricBounds[0] + height,
			target.geometricBounds[1] + width
		];
		doc.viewPreferences.horizontalMeasurementUnits = savedHorizontalMeasurementUnits;
		doc.viewPreferences.verticalMeasurementUnits = savedVerticalMeasurementUnits;
		target.place(imageFile);
		target.fit(FitOptions.PROPORTIONALLY);
		target.insertLabel("img." + $$EXTENSION_ID$$, imageURL);
	}
	while (false);
};

