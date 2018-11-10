#
# Enable debugging
#

defaults write com.adobe.CSXS.4.plist PlayerDebugMode 1
defaults write com.adobe.CSXS.4.plist LogLevel 5
defaults write com.adobe.CSXS.5.plist PlayerDebugMode 1
defaults write com.adobe.CSXS.5.plist LogLevel 5
defaults write com.adobe.CSXS.6.plist PlayerDebugMode 1
defaults write com.adobe.CSXS.6.plist LogLevel 5
defaults write com.adobe.CSXS.7.plist PlayerDebugMode 1
defaults write com.adobe.CSXS.7.plist LogLevel 5
defaults write com.adobe.CSXS.8.plist PlayerDebugMode 1
defaults write com.adobe.CSXS.8.plist LogLevel 5
defaults write com.adobe.CSXS.9.plist PlayerDebugMode 1
defaults write com.adobe.CSXS.9.plist LogLevel 5

#
# Force Mac OS to re-read the PLIST file
#
killall -u `whoami` cfprefsd
