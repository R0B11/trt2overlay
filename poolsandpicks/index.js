function generateTiles(banNum, bestOf) {
    var lengthTrackerRed = 10;
    var lengthTrackerBlue = 50;

    for (let i = 0; i < ((bestOf-1) / 2) + banNum; i++) {
        // Checking if a ban card needs to be made
        if (i < banNum) {
            // Red Side
            // Create outer div
            if (i == 1){

                lengthTrackerRed *= 1.75;

                var redOuterDiv = $('<div/>', {
                    id: `redCard${i}`,
                    class: 'mapCardRed',
                }).css({
                    'left': `${lengthTrackerRed}px`,
                    'background-image': "url('./static/red-ban-tile.png')"
                });
                
            }
            else {
                var redOuterDiv = $('<div/>', {
                    id: `redCard${i}`,
                    class: 'mapCardRed',
                }).css({
                    'left': `${lengthTrackerRed}px`,
                    'background-image': "url('./static/red-ban-tile.png')"
                });
            };

            $('<div/>', {
                id: 'mapCardContent',
                class: 'tile-picking',
                text: 'BANNING'
            }).appendTo(redOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            redOuterDiv.append(mapslotBlock);

            // Append outer div to body or other container
            $('#picksBans').append(redOuterDiv);

            // Blue Side

            // Create outer div
            var blueOuterDiv = $('<div/>', {
                id: `blueCard${i}`,
                class: 'mapCardBlue',
            }).css({
                'left': `${lengthTrackerBlue}px`,
                'background-image': "url('./static/blue-ban-tile.png')"
            });


            $('<div/>', {
                id: 'mapCardContent',
                class: 'tile-picking',
                text: 'BANNING'
            }).appendTo(blueOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            blueOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#picksBans').append(blueOuterDiv);
        }
        // If a ban card does not need to be made anymore, pick cards will be generated
        else {
            // Red Side
            var redOuterDiv = $('<div/>', {
                id: `redCard${i}`,
                class: 'mapCardRed',
            }).css({
                'left': `${lengthTrackerRed}px`
            });


            $('<div/>', {
                id: 'mapCardContent',
                class: 'tile-picking',
                text: 'PICKING'
            }).appendTo(redOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            redOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#picksBans').append(redOuterDiv);

            // Blue Side 
            var blueOuterDiv = $('<div/>', {
                id: `blueCard${i}`,
                class: 'mapCardBlue',
            }).css({
                'left': `${lengthTrackerBlue}px`
            });


            $('<div/>', {
                id: 'mapCardContent',
                class: 'tile-picking',
                text: 'PICKING'
            }).appendTo(blueOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            blueOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#picksBans').append(blueOuterDiv);
        }

        lengthTrackerRed+= 140;
        lengthTrackerBlue+= 140;
    }
}

generateTiles(2, 13);