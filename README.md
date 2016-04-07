### StickyScreen KWin script

This tiny kwin script makes all windows on external screen sticky.

This essentially makes external screens act as one desktop, leaving the desktop
switching to only affect the primary screen.

Script automatically sets/resets the sticky feature on windows
as they are moved between screens.

Also, the script provides a global keyboard shortcut to switch between screens,
because the one provided by KDE either doesn't do anything or behaves in a weird way.
The shortcut is `Meta+Tab` by default.

#### Installation:

```
plasmapkg2 -t kwinscript -i /path/to/kwin-stickyscreen
```

To edit the script (for example to edit the switch shortcut), edit the file at:

```
~/.local/share/kwin/scripts/hk.kral.stickyscreen/contents/code/stickyscreen.js
```

If you wish to uninstall the script, you might need to do so manually,
as `plasmapkg2` doesn't work very well:

```
rm -rf ~/.local/share/kwin/scripts/hk.kral.stickyscreen
rm ~/.local/share/kservices5
# Remove hk.kral.stickyscreenEnabled from ~/.config/kwinrc
# Remove StickyScreenSwtich from ~/.config/kglobalshortcutsrc
```
