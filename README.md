# INAV: The New Documentation Project

![INAV](static/img/inav_home_dark.svg)

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/iNavFlight/inav/nightly-build.yml?label=Nightly)
![GitHub Tag](https://img.shields.io/github/v/tag/iNavFlight/inav?label=Release)
![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)


This project is the new and updated documentation built using the new, lightweight documentation engine [Docmd](https://docmd.io/). 
The current INAV documentation is scattered about in the Github Wiki and the docs directory of the main project. 
This documentation attempts to consolidate all the knowledge about INAV into a centralized, easy to access and read location while simulataneously making INAV ready for the LLM and agentic AI era.

To build and run the docs locally, install npm on your system and follow the Docusaurus installation instructions. 

- Prepare the environment with `npm run clear` and `rm package-lock.json`.
- Make sure all packages are installed with `npm install`.
- Run the dev server with `npx docmd dev`.

Documentation can be accessed at this URL: https://inavflight.github.io/


## Versioning Scheme

The website utilizes Docmd's versioning feature to keep track of major changes to the firmware.
The current version is the active stable release in `/docs` directory. 
It will be updated and changed with each minor revision of the existing version. 
Upon the release of the next stable version, the old version in `/docs` will be renamed to `/docs-vX` where X is the recently closed version.

## Image and Media References
* All static images are stored in `/assets/images/`.
* Brand specific images are placed in `/assets/images/brand/`.
* INAV content specific images are placed in `/assets/images/content`.

## Linking to Pages
When linking to local pages, please do not use http urls or absolute paths to link to other markdown documents that are part of the site.
For easier maintenance and organization, use relative paths starting from the working directory eg: `../quickstart/Name_of_markdown.md` if not in the `quickstart` directory, which exists one level above.
Autocomplete on VS Code should find the directories automatically. 
Linking to headings within the document work as well by using `#` following the filename.
