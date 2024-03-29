<?php  

$router = new \Phalcon\Mvc\Router(false);

    $router->setDefaultController('index');
    $router->setDefaultAction('index');

    $router->add(
	    '/{language:[a-z]{2}}/:controller/:action',
	    array(
	        'controller' => 2,
	        'action'     => 3
	    )
	);

	$router->add(
	    "/logout",
	    [	"controller" => "index", "action" => "logout", 'language'=>'en'  ]
	);

	$router->add(
	    '/{language:[a-z]{2}}/:action',
	    [	"controller" => "index", "action" => 2, ]
	)->setName('index_act');

	$router->add(
	    '/ajax/:action',
	    [	"controller" => "ajax", "action" => 1, 'language'=>'en' ]
	);

	$router->add(
	    '/tour-xml/tour_{tour_id:[0-9]{1,}}_{pano_id:[0-9]{1,}}\.xml',
	    [	"controller" => "krpano", "action" => 'tour', 'language'=>'en' ]
	);

	$router->add(
	    '/{language:[a-z]{2}}/place/{url1:[a-zA-Z0-9-]{4,}}',
	    [	"controller" => "place", "action" => 'view', ]
	)->setName('tour_url');

	$router->add(
	    '/{language:[a-z]{2}}/place/{url1:[a-zA-Z0-9-]{4,}}/{url2:[a-zA-Z0-9-]{4,}}',
	    [	"controller" => "place", "action" => 'view', ]
	)->setName('pano_url');


	// $router->add(
	//     "/:action",
	//     [	"controller" => "index", "action" => 1, ]
	// );
	
	// $router->add(
	//     "/:action",
	//     [	"controller" => "index", "action" => 1, ]
	// );

	$router->add(
	    "/sphere/:action",
	    [	"controller" => "sphere", "action" => 1, ]
	);

	$router->add(
	    "/tools/:action",
	    [	"controller" => "tools", "action" => 1, ]
	);

	$router->add(
	    "/register",
	    [	"controller" => "login", "action" => "register", ]
	);

	$router->add(
	    "/planing",
	    [	"controller" => "index", "action" => "planing", ]
	)->setName('planing');

	$router->add(
	    "/focus",
	    [	"controller" => "index", "action" => "focus", ]
	)->setName('focus');

	$router->add(
	    "/cron",
	    [	"controller" => "index", "action" => "cron", ]
	);

	$router->add(
	    "/adminpanel",
	    [	"controller" => "adminpanel", "action" => "index", ]
	);

		$router->add(
	    "/adminpanel/:action",
	    [	"controller" => "adminpanel",   "action"     => 1, ]
	);

	$router->add("/auth/:action",
	    array(
	        "controller" => "auth",
	        "action"     => 1,
	    )
	);


	// $router->add(
	//     "/campaign/edit/{id:[0-9]+}",
	//     [	"controller" => "camps", "action" => "edit", ]
	// )->setName('camp-edit');


	$router->notFound(array(
	    "controller" => "error",
	    "action" => "error404"
	));


	return $router;