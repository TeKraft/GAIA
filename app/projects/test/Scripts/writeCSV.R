options(repos=c("CRAN" ="http://cran.uni-muenster.de"))

# install.packages("curl")
# install.packages("raster")
# install.packages("intervals")

 install.packages("devtools")
 devtools::install_github("Paradigm4/SciDBR")
 devtools::install_github("appelmar/scidbst", ref="dev")
 install.packages("gdalUtils") # requires GDAL with SciDB driver (see https://github.com/appelmar/scidb4gdal/tree/dev) on the system:
 install.packages("gdalUtils", repos="http://R-Forge.R-project.org")

SCIDB_HOST = "128.176.148.9"
SCIDB_HOST = "128.176.148.9"
SCIDB_PORT = 30011 # TODO
SCIDB_USER = "gaia" # TODO
SCIDB_PW   =  "sNcquwM42RsQBtZqkpeB4HqK" # TODO

# We don't want to pass connection details information in every single gdal_translate call und thus set it as environment variables
Sys.setenv(SCIDB4GDAL_HOST=paste("https://",SCIDB_HOST, sep=""),
           SCIDB4GDAL_PORT=SCIDB_PORT,
           SCIDB4GDAL_USER=SCIDB_USER,
           SCIDB4GDAL_PASSWD=SCIDB_PW)

#correction of server proxy error!!!
Sys.setenv(http_proxy="")
Sys.setenv(https_proxy="")
Sys.setenv(HTTP_PROXY="")
Sys.setenv(HTTPS_PROXY="")

library(scidbst)
scidbconnect(host=SCIDB_HOST,port = SCIDB_PORT,
             username = SCIDB_USER,
             password = SCIDB_PW,
             auth_type = "digest",
             protocol = "https")

scidbst.ls(extent=TRUE) # query available datasets

write.csv(scidbst.ls(extent = TRUE,srs = TRUE, trs=TRUE), 
          file="datasets.csv",row.names = FALSE,quote = FALSE)