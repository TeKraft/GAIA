<?php
	phpinfo();
	
	exec("Rscript script.R $N", $callback);
	print_r($callback)
?>		