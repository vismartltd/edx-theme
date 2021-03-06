#!/bin/bash
echo "edX fast lms theme update script v.0.1"
echo "Crafted at Nine'n'One HQ in Saint-Petersburg, Russia"
echo "Pulling theme and updating assets"
sudo -H -u edxapp bash -c 'git pull; source /edx/app/edxapp/edxapp_env;cd /edx/app/edxapp/edx-platform;paver update_assets lms --settings=aws'

echo "Removing cached templates"
sudo rm -rf /tmp/mako_lms
echo "Reloading edX app"
sudo /edx/bin/supervisorctl restart edxapp:
echo "Done"
