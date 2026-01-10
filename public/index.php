<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'inc/header.blade.php'; ?>
</head>

<body>
    <div class="wrapper">
        <?php include ('inc/navigation.blade.php'); ?>

        <div class="container">
            <?php include ('inc/landing_slider.blade.php'); ?>
            <?php include ('inc/about_section.blade.php'); ?>
            <?php include ('inc/portfolio_section.blade.php'); ?>
            <?php include ('inc/outside_section.blade.php'); ?>
        </div>

        <div class="portfolio-modal-backdrop fade"></div>
        <?php include ('inc/footer.blade.php'); ?>
    </div>
</body>

</html>