@echo off
echo Renaming components for case sensitivity...
ren "components\sideBar.tsx" "sidebar.tsx" 2>nul
ren "components\sideBar-items.tsx" "sidebar-items.tsx" 2>nul
ren "components\mobileSidebar.tsx" "mobile-sidebar.tsx" 2>nul
ren "components\UserProgress.tsx" "user-progress.tsx" 2>nul
echo Renaming complete