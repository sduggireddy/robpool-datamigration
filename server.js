   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'SQL2008_669663_robpool_user',
        password: 'nfl2009',
        server: 'sql2k801.discountasp.net', 
        database: 'SQL2008_669663_robpool' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        request.stream = true;   
        // query to the database and get the records
        var result = request.query("select * from dbo.AdminComments WHERE LastRecord = 'Y'");

        request.on('row', function(row) {
           //delete existing record 
           AdminComments.destroy({
                where: {},
                truncate: true
           });

           //insert new record
           AdminComments
                .create({
                    comment: row.Comment
           }).then(admincomment => {
           }); 
        });

        request.on('error', function(err) {
            console.log(err);
            // May be emitted multiple times
        });

        request.on('done', function(returnValue) {
            console.log('comments copied');
        });        

        // create Request object
        request = new sql.Request();
        request.stream = true;   
        // query to the database and get the records
        result = request.query("select * from dbo.NFLTeams");

        request.on('row', function(row) {
           NFLTeams.removeAttribute('id');
           NFLTeams.removeAttribute('createdAt');
           NFLTeams.removeAttribute('updatedAt');

           //delete existing record 
           NFLTeams.destroy({
                where: {},
                truncate: true
           });

           //insert new record
           NFLTeams
                .create({
                    TeamId: row.TeamId,
                    TeamName: row.TeamName,
                    TeamShortName: row.TeamShortName,
                    Team: row.Team
           }).then(nflteam => {
           }); 
        });

        request.on('error', function(err) {
            console.log(err);
            // May be emitted multiple times
        });

        request.on('done', function(returnValue) {
            console.log('nfl teams copied');
        });        
    });

     