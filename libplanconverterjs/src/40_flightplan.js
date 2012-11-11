
planconverterjs.flightplan = function(title) {
    this.title = title || 'Flight plan';
    this.wpts = [];

    /* append a waypoint to the plan */
    this.append_wpt = function(wpt) {
        this.wpts.push(wpt);
    }

    /* 
     * return a table element with the flight plan
     *
     * The parameter id is the id given to the html div element.
     */
    this.to_table = function(id) {
        if (this.wpts.length <= 0) {
            return "";
        }
        /* create the table element */
        var table = $("<table/>", {
            "class" : planconverterjs.__helpers.constants.FLIGHT_PLAN_CLASS_NAME,
            "id" : id
        });
        /* add a header row with the flight plan name */
        var header = $("<th/>", {
            "class" : planconverterjs.__helpers.constants.FLIGHT_PLAN_CLASS_NAME,
            "colspan" : planconverterjs.__helpers.constants.FLIGHT_PLAN_TABLE_COLS
        });
        header.html(this.title);
        table.append(
                $("<tr/>", {
                    "class" : planconverterjs.__helpers.constants.FLIGHT_PLAN_CLASS_NAME
                }).append($(header)));

        /* add a proper header row */
        header2 = $("<tr/>", {
            "class" : planconverterjs.__helpers.constants.FLIGHT_PLAN_CLASS_NAME
        });
        header2.append(planconverterjs.__helpers.functions.make_cell("ID", "th"));
        header2.append(planconverterjs.__helpers.functions.make_cell("Heading", "th"));
        header2.append(planconverterjs.__helpers.functions.make_cell("Distance", "th"));
        header2.append(planconverterjs.__helpers.functions.make_cell("Latitude", "th"));
        header2.append(planconverterjs.__helpers.functions.make_cell("Longitude", "th"));
        table.append(header2);
        
        /* add each waypoint on a row */
        table.append(this.wpts[0].to_row());
        for (var i = 1; i < this.wpts.length; i++) {
            table.append(this.wpts[i].to_row(this.wpts[i-1]));
        }
        return table;
    }
}

