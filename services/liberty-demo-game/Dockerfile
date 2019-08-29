# Download latest Open Liberty from DockerHub
FROM open-liberty:latest

# Create a Liberty server instance called "liberty-demo-gameServer"
RUN /opt/ol/wlp/bin/server create liberty-demo-gameServer

# Copy over the customized server.xml to the Liberty server
COPY src/main/liberty/config/server.xml /opt/ol/wlp/usr/servers/liberty-demo-gameServer/

# Copy over the jvm.options to the Liberty server
COPY src/main/liberty/config/resources/jvm.options /opt/ol/wlp/usr/servers/liberty-demo-gameServer/

#Copy over the bootstrap.properties to the Liberty Server
COPY bootstrap.properties /opt/ol/wlp/usr/servers/liberty-demo-gameServer/

# Copy the liberty-demo-game-1.0-SNAPSHOT.war  WAR application to the Liberty server
COPY target/liberty-demo-game*.war /opt/ol/wlp/usr/servers/liberty-demo-gameServer/apps/liberty-demo-game.war

# Set Path Shortcuts, redirect all Liberty logs to "/logs"
ENV LOG_DIR=/logs

# Start the Liberty server
CMD ["/opt/ol/wlp/bin/server", "run", "liberty-demo-gameServer"]
