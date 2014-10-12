/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

	/***************************************************************************
	 *                                                                          *
	 * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
	 * etc. depending on your default view engine) your home page.              *
	 *                                                                          *
	 * (Alternatively, remove this and add an `index.html` file in your         *
	 * `assets` directory)                                                      *
	 *                                                                          *
	 ***************************************************************************/

	'/' : {
		view : 'index'
	},

	"/login" : {
		view : "login"
	},

	// admin/staff
	"GET /admin/staff/new" : { controller : "admin/staff", action : "new" },
	"POST /admin/staff/create" : "admin/staffController.create",
	"GET /admin/staff/index" : "admin/staff.index",
	"GET /admin/staff/:id/details" : "admin/staff.show",
	"DELETE /admin/staff/:id" : "admin/staff.destroy",
	"GET /admin/staff/:id/edit" : "admin/staff.edit",
	"POST /admin/staff/update" : "admin/staff.update",
	"GET /admin/staff/:id/getDates" : "admin/staff.getDates",
	"GET /admin/staff/search" : "admin/staff.search",
	"GET /admin/staff/search/results" : "admin/staff.searchResults",

    // admin/product
    "GET /admin/product/new" : { controller : "admin/product", action : "new" },
    "POST /admin/product/create" : "admin/productController.create",
    "GET /admin/product/index" : "admin/product.index",
    "GET /admin/product/:id/details" : "admin/product.show",
    "DELETE /admin/product/:id" : "admin/product.destroy",
    "GET /admin/product/:id/edit" : "admin/product.edit",
    "POST /admin/product/update" : "admin/product.update",
    "GET /admin/product/search" : "admin/product.search",
    "GET /admin/product/search/results" : "admin/product.searchResults"

};
