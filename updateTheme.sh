#!/bin/bash
sudo -H -u edxapp bash -c 'git pull; source /edx/app/edxapp/edxapp_env;cd /edx/app/edxapp/edx-platform;paver update_assets lms --settings=aws'

sudo rm -rf /tmp/mako_lms
sudo /edx/bin/supervisorctl restart edxapp:
