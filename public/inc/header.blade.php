 <meta charset="utf-8">
 <meta content="width=device-width, initial-scale=1.0" name="viewport">

 <title><?php echo htmlspecialchars($pageTitle ?? 'Rob Howdle - iCV', ENT_QUOTES, 'UTF-8'); ?></title>
 <meta content="" name="descriptison">
 <meta content="" name="keywords">

 <?php if (!empty($robotsMeta)) : ?>
     <meta name="robots" content="<?php echo htmlspecialchars($robotsMeta, ENT_QUOTES, 'UTF-8'); ?>">
 <?php endif; ?>

 <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico">

 <script src="https://kit.fontawesome.com/dd6bff54df.js" crossorigin="anonymous"></script>

 <link href="assets/css/main.css" rel="stylesheet" />