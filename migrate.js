//PostgreSQL connect to DB
const promise = require('bluebird');
const config = require('./config.json');
const options = {
  // Initialization Options
  promiseLib: promise,
  capSQL: true
};
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:postgres10@localhost:5432/robpool';
const db = pgp(connectionString);

//mssql connect to DB
const sql = require('mssql');
// const config = {
//     user: 'SQL2008_669663_robpool_user',
//     password: 'nfl2009',
//     server: 'sql2k801.discountasp.net',
//     database: 'SQL2008_669663_robpool'
// };

const seasonid = 8;

/* delete existing data in postgres */
async function deleteExistingData() {
    await db.func('deleteexistingdata', [])
    .then(data => {
        console.log('Deleted existing data'); // print data;        
    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
    });
}

deleteExistingData();

// add copy functions
function sample(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
    }    
}

function copyWeeklyResults(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {SeasonId: row.SeasonId, Week: row.Week,PlayerId: row.PlayerId, TotalPoints: row.TotalPoints, 
                        TotalPointsWithoutHomeAdvantage: row.TotalPointsWithoutHomeAdvantage,
                        Result: row.Result, SurvivorPickVotedOut: row.SurvivorPickVotedOut};
        let query = pgp.helpers.insert(dataSingle, null, 'WeeklyResults');
        db.none(query);    
    }    
}

function copySurvivorPicks(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {SeasonId: row.SeasonId, Week: row.Week,PlayerId: row.PlayerId, SurvivorId: row.SurvivorId};
        let query = pgp.helpers.insert(dataSingle, null, 'SurvivorPicks');
        db.none(query);    
    }    
}

function copyRobPoolPlayers(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {SeasonId: row.SeasonId, PlayerId: row.PlayerId, DivisionId: row.DivisionId, EliminationPickLocked: row.EliminationPickLocked, SurvivorPickLockedOut: row.SurvivorPickLockedOut};
        let query = pgp.helpers.insert(dataSingle, null, 'RobPoolPlayers');
        db.none(query);   
    }    
}

function copyPlayersMatchup(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {SeasonId: row.SeasonId, Week: row.Week,Player1Id: row.Player1Id, Player2Id: row.Player2Id,
                        HomePlayerId: row.HomePlayerId, AwayPlayerId: row.AwayPlayerId, Player1PicksCompleted: row.Player1PicksCompleted,
                    Player2PicksCompleted: row.Player2PicksCompleted};
        let query = pgp.helpers.insert(dataSingle, null, 'PlayersMatchup');
        db.none(query);   
    }    
}

function copyPlayerPicksStatus(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {
            SeasonId: row.SeasonId, Week: row.Week,PlayerId: row.PlayerId,
            SelectionStatus: row.SelectionStatus, SubmittedBy: row.SubmittedBy
        };
        let query = pgp.helpers.insert(dataSingle, null, 'PlayerPicksStatus');
        db.none(query);  
    }    
}

function copyPlayerPicks(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {
            SeasonId: row.SeasonId, Week: row.Week, GameId: row.GameId,
            PlayerId: row.PlayerId, TeamId: row.TeamId, Rank: row.Rank,
            Result: row.Result, Points: row.Points
        };
        let query = pgp.helpers.insert(dataSingle, null, 'PlayerPicks');
        db.none(query);  
    }    
}

function copyPlayerEliminationPicks(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {
            SeasonId: row.SeasonId, Week: row.Week, PlayerId: row.PlayerId, TeamId: row.TeamId, Result: row.Result
        };
        let query = pgp.helpers.insert(dataSingle, null, 'PlayerEliminationPicks');
        db.none(query);  
    }    
}

function copyNFLWeeks(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {
            SeasonId: row.SeasonId, WeekId: row.WeekId,
            StartDate: row.StartDate, StopDate: row.StopDate,
            ResultDueDate: row.ResultDueDate, PicksStartDate: row.PicksStartDate,
            PicksStopDate: row.PicksStopDate, LockPicksSelection: row.LockPicksSelection
        };
        let query = pgp.helpers.insert(dataSingle, null, 'NFLWeeks');
        db.none(query);    
    }    
}

function copyNFLWeeklyMatchup(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {SeasonId: row.SeasonId, Week: row.Week, GameId: row.GameId, 
                        Team1Id: row.Team1Id, Team2Id: row.Team2Id,
                        FavoriteTeamId: row.FavoriteTeamId, UnderDogTeamId: row.UnderDogTeamId,
                        HomeTeamId: row.HomeTeamId, AwayTeamId: row.AwayTeamId,
                        Spread: row.Spread, WinnerTeamId: row.WinnerTeamId,
                        WinnerTeamPoints: row.WinnerTeamPoints, LostTeamId: row.LostTeamId
                        };
        let query = pgp.helpers.insert(dataSingle, null, 'NFLWeeklyMatchup');
        db.none(query);    
    }    
}

function copyAdminComments(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let now = new Date();
        let dataSingle = {id: row.UniqueId, comment: row.Comment, lastrecord: row.LastRecord, createdAt: row.DateEntered, updatedAt: now};
        let query = pgp.helpers.insert(dataSingle, null, 'AdminComments');
        db.none(query); 
    }    
}
    
function copyPlayers(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {PlayerId: row.PlayerId, FirstName: row.FirstName, LastName: row.LastName, username: row.username, password: row.password};
        let query = pgp.helpers.insert(dataSingle, null, 'Players');
        db.none(query);   
    }    
}

function copyNFLTeams(data) {
    let recordset = data.recordset;
    for (let index in recordset) {
        let row = recordset[index];
        let dataSingle = {TeamId: row.TeamId, TeamName: row.TeamName, TeamShortName: row.TeamShortName, TeamSymbol: "", Team: row.Team};
        let query = pgp.helpers.insert(dataSingle, null, 'NFLTeams');
        db.none(query);    
    }    
}

(async  () => {
    try {
        let pool = await sql.connect(config);

        //copy NFL Teams
        await pool.request()
            .query('select * from dbo.NFLTeams')
            .then(result => {
                copyNFLTeams(result); 
                console.log('NFL Teams copied');               
            });

        //copy Players
        await pool.request()
            .query('select * from dbo.Players')
            .then(result => {
                copyPlayers(result); 
                console.log('Players copied');               
            });

        //copy Admin Comments
        await pool.request()
            .query("select * from dbo.AdminComments WHERE LastRecord = 'Y'")
            .then(result => {
                copyAdminComments(result); 
                console.log('AdminComments copied');               
            });                

        //copy other tables
        var tablenames = ['NFLWeeklyMatchup', 'NFLWeeks', 'PlayerEliminationPicks', 'PlayerPicks', 'PlayerPicksStatus', 
                    'PlayersMatchup', 'RobPoolPlayers', 'SurvivorPicks', 'WeeklyResults'];

        for(let index in tablenames) {
            let queryText = 'select * from dbo.' + tablenames[index] + ' WHERE seasonid = @seasonid';
            await pool.request()
            .input('seasonid', sql.Int, seasonid)
            .query(queryText)
            .then(result => {
                switch (tablenames[index]) {
                    case "NFLWeeklyMatchup":
                        copyNFLWeeklyMatchup(result)
                        console.log('%s copied', tablenames[index]);               
                        break;
                    case "NFLWeeks":
                        copyNFLWeeks(result);
                        console.log('%s copied', tablenames[index]);               
                        break;
                    case "PlayerEliminationPicks":
                        copyPlayerEliminationPicks(result);
                        console.log('%s copied', tablenames[index]);               
                        break;
                    case "PlayerPicks":
                        copyPlayerPicks(result);
                        console.log('%s copied', tablenames[index]);               
                        break;
                    case "PlayerPicksStatus":
                        copyPlayerPicksStatus(result);
                        console.log('%s copied', tablenames[index]);               
                        break;
                    case "PlayersMatchup":
                        copyPlayersMatchup(result);
                        console.log('%s copied', tablenames[index]);               
                        break;
                    case "RobPoolPlayers":
                        copyRobPoolPlayers(result);
                        console.log('%s copied', tablenames[index]);               
                        break;
                    case "SurvivorPicks":
                        copySurvivorPicks(result);
                        console.log('%s copied', tablenames[index]);               
                        break;
                    case "WeeklyResults":
                        copyWeeklyResults(result);
                        console.log('%s copied', tablenames[index]);               
                        break;
                }                
            });                  
        }                                             
    } catch (err) {
        // ... error checks 
        console.log(err);
    }
})();