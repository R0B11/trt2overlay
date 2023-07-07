# The Roundtable II Tournament Client

This API is used by The Roundtable II website & gosumemory stream overlay. This API functions as a bridge between these services and a central PostgreSQL database.

## Setup

- Clone the repository: `git clone https://github.com/R0B11/trt2overlay` (or just ask for the files from Fairy Bread / ROB)
- Download the latest version of gosumemory - `https://github.com/l3lackShark/gosumemory`
- Move all the folders into the "static" folder
- Run gosumemory.exe
- Run your tournament client

# Folders

## Bracket Royale Brackets
Setup on OBS:
- URL: `http://localhost:24050/br-brackets`
- Browser Size: `1920x1380 (top 1920x1080 shown on stream)`
- Tournament Client needs to have at least team size 1 for this page to work completely

Buttons:
- Left/Middle/Right Hand Side - controls the CONTROL PANEL for each side
- If Left/Right Hand Side is selected - The players for the match can be selected, up to 8 players. A winner can be chosen.
- If Middle is selected - Able to select the winners of the left / right side BR matches, and able to select the winner of the 1v1 match.

## Bracket Royale Gameplay

Setup on OBS:
- URL: `http://localhost:24050/br-gameplay`
- Browser Size: `1920x1380 (top 1920x1080 shown on stream)`
- Tournament Client needs team size 4 for this page to work

Allowed inputs:
- Two commentators

Buttons:
- Change commentator names button

## 1v1 Bracket
Setup on OBS:
- URL: `http://localhost:24050/brackets`
- Browser Size: `1920x1280 (top 1920x1080 shown on stream)`
- Tournament Client needs to have at least team size 1 for this page to work completely

Buttons:
- To Winner Bracket
- To Loser Bracket
- Pull Results from Database

## Gameplay
Setup on OBS:
- URL: `http://localhost:24050/brackets`
- Browser Size: `1920x1380 (top 1920x1080 shown on stream)`
- Tournament Client needs to have at least team size 1 for this page to work completely

Allowed inputs:
- Two commentators

Buttons:
- Change commentator names button
- Change round buttons (you should only click on this ONCE between the gameplay and the pools and picks screen - these pages will communicate with each other)

## Picks and Bans / Mappool Screen
Setup on OBS:
- URL: `http://localhost:24050/poolsandpicks`
- Browser Size: `1920x1430 (top 1920x1080 shown on stream)`
- Tournament Client needs to have at least team size 1 for this page to work completely

Buttons:
- Change round buttons (you should only click on this ONCE between the gameplay and the pools and picks screen - these pages will communicate with each other)
- Select 1st ban (red/blue)
- Select 1st pick (red/blue)
- Generate Tiles - Generates the pick order tiles. This should only be clicked AFTER the 1st ban and pick has been selected
- Remove Tiles

## Win Screen
Setup on OBS:
- URL: `http://localhost:24050/winscreen`
- Browser Size: `1920x1430 (top 1920x1080 shown on stream)`
- Tournament Client needs to have at least team size 1 for this page to work completely
Displays the winner from the match in the gameplay screen.