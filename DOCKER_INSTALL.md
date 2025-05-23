# JSE-CORE Docker Image TODO

https://hub.docker.com/r/jenkins/jenkins
sha256:9becce9e64da749e5fcab730c88445d21fdcf6ce1a416f4e0a42273b09b4ac21

As root;

Also these commands might come in handy;

On Windows in Git Bash;

```
docker ps
winpty docker exec -it -u root <containerId/> bash
winpty docker exec -it -u root 5ca973c2d49b bash
```

On Max Os or other Unix

```
docker ps
docker exec -it -u root <containerId/> bash
```

Then

```
cat /var/jenkins_home/secrets/initialAdminPassword
```

Then install other stuff

```
 curl --location --show-error -O --url "https://services.gradle.org/distributions/gradle-8.14-all.zip"

apt update 
# apt install nodejs
apt-get update
nodejs -v
apt install npm
npm -v
npm i -g npx
npx --version
npm i -g typescript
npm install -g tsx


curl --location --show-error -O --url "https://download.java.net/java/GA/jdk24.0.1/24a58e0e276943138bf3e963e6291ac2/9/GPL/openjdk-24.0.1_linux-x64_bin.tar.gz"

npm install -g @ts.adligo.org/slink
```