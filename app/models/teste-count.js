db.project.aggregate([
    {$lookup: {from: "story", localField: "_id", foreignField: "id_project", as: "project_story"}},
    {$group : {
    	_id : _id,
    	total: { $sum: 1 },
    	total_story:
    	{
    		$cond:
    		{
    			if: time_total,
    				then: { $sum: 1 },
    			else: { $sum: 0 }
    		}
    	}
    }}
]);
