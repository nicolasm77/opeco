var Distancer = /** @class */ (function () {
    function Distancer() {
        this.metric = "K";
    }
    Distancer.prototype.setOrigin = function (o) {
        this.originPoint = o;
    };
    Distancer.prototype.setDestination = function (d) {
        this.destinationPoint = d;
    };
    Distancer.prototype.setMetric = function (m) {
        this.metric = m;
    };
    Distancer.prototype.calculateDistance = function () {
        // Set up the variables we use for the calculation
        var lat1 = this.originPoint.lat;
        var lon1 = this.originPoint.lon;
        var lat2 = this.destinationPoint.lat;
        var lon2 = this.destinationPoint.lon;
        var unit = this.metric;
        var theta = lon1 - lon2;
        // Do the sin/cos calculation
        var dist = Math.sin(this.deg2rad(lat1)) * Math.sin(this.deg2rad(lat2)) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.cos(this.deg2rad(theta));
        // Some Math
        dist = Math.acos(dist);
        dist = this.rad2deg(dist);
        dist = dist * 60 * 1.1515;
        // Do the unit
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        else if (unit == "M") {
            dist = dist * 0.8684;
        }
        // Return the distance
        return dist;
    };
    Distancer.prototype.deg2rad = function (deg) {
        return (deg * Math.PI / 180.0);
    };
    Distancer.prototype.rad2deg = function (rad) {
        return (rad * 180.0 / Math.PI);
    };
    return Distancer;
}());
export { Distancer };
