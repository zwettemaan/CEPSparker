//
// Simple image handler
//

$$SHORTCODE$$.placeImage = function(imagePath, imageURL, width, height) {


    do {

        try {

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

            var savedHorizontalMeasurementUnits = doc.viewPreferences.horizontalMeasurementUnits;
            doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
            var savedVerticalMeasurementUnits = doc.viewPreferences.verticalMeasurementUnits;
            doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;

            var target;
            var scaledWidth;
            var scaledHeight;
            if (app.selection && app.selection.length > 0) {
                target = app.selection[0];
                scaledWidth = target.geometricBounds[3] - target.geometricBounds[1];
                var scale = scaledWidth / width;
                scaledHeight = height * scale;
            }
            else {
                target = doc.rectangles.add();
                scaledWidth = width;
                scaledHeight = height;
            }

            target.geometricBounds = [ 
                target.geometricBounds[0],
                target.geometricBounds[1],
                target.geometricBounds[0] + scaledHeight,
                target.geometricBounds[1] + scaledWidth
            ];
            target.place(imageFile);
            target.fit(FitOptions.PROPORTIONALLY);
            target.insertLabel("$$EXTENSION_ID$$.imageURL", imageURL);

            doc.viewPreferences.horizontalMeasurementUnits = savedHorizontalMeasurementUnits;
            doc.viewPreferences.verticalMeasurementUnits = savedVerticalMeasurementUnits;
                
        }
        catch (err) {
            $$SHORTCODE$$.logError("$$SHORTCODE$$.placeImage throws" + err);            
        }
    }
    while (false);
};

