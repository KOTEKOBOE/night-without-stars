# Yet another todo list
Trivial thing.
Thank god its not using React tho', yet

Main goal is to using only vanilla JS, CSS and HTML
## Made so far
 - add/edit/remove todo;
 - sort todos by time;
 - clear whole list;
 - settings:
  - saving list into local storage (by default);
  - fetching random text as todos, quantity can be specified.
 - localization in english and russian;
 - switching between light and dark themes;
 - todo color customization;
 - somewhat BEM-styled CSS

## Further development
It's become kinda hard, mainly because of bad structure ('twas a mistake to not using modules before), so the next step is to start using Vite (hot reload, postcss, plugins and so on, very useful) as bundler.
*and rewrite nearly everything, yeah*

### Yet to be made features after migration
 - components with separated styles;
 - lazy loading for most nonessential things;
 - dnd;
 - complete status for todo (w/ filter, mass complete, restoring, etc.);
 - import and export list from/to json file.
