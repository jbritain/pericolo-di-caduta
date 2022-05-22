This is a small web app which runs on the same host as a Minecraft server. Pretty much all it does is give you a restart button and a way to download backups. This is not designed for general use, but I thought I would open source the code anyway. If for some reason you do try to use this, you will need to do the following:

- Create a file named `.env` and put in it

  ```
  ROOT_PWD=[your root password]
  RESTART_PWD=[the password required to restart the server]
  BACKUP_LOCATION=[the absolute path to where the backups for your minecraft world are]
  ```

- Change any mentions of the word `joshua` in any of the files to your own username

I have no idea if this works on Windows. I created and tested it on Ubuntu server. Please don't use this.