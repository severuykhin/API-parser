const presets = {

	'date' : function (data) {
		
		const res = [];
		data.forEach( item => {
			const metrics = {};

			const length = item.totals[3].length; // PD days length

			metrics.id           = item.query.ids[0];
			metrics.totalUnique  = item.totals[0].reduce(  (prev, curr) => { return prev + curr  });
			metrics.totalViews   = item.totals[1].reduce(  (prev, curr) => { return prev + curr  });
			metrics.totalVisits  = item.totals[2].reduce(  (prev, curr) => { return prev + curr  });
			metrics.totalPD      = (item.totals[3].reduce(  (prev, curr) => { return prev + curr  }) / length).toFixed(2);
			metrics.totalGoals   = item.totals[4].reduce(  (prev, curr) => { return prev + curr  });			

			res.push(metrics);
		});
		
		return res;
	}

};

export { presets };