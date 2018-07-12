import jsonData from '../cities';

export default {
	cities : jsonData.cities,
	radiusValues : [1, 5, 10, 15, 20],
	amountValues : [10, 50, 100, 250, 500],

	periods : [
		{ name : '1 неделя', value : '7daysAgo'   },
		{ name : '1 месяц',  value : '31daysAgo'  },
		{ name : 'Квартал',  value : '120daysAgo' },
		{ name : '1 год',    value : '356daysAgo' },
	],

	filters : {
		site : [
			{
				value : 1,
				name  : 'Есть'
			},
			{
				value : 2,
				name  : 'Нет'
			},
		],
		social : [
			{
				value   : 0,
				name    : "Нет",
				pattern : ''
			},
			{
				value : 1,
				name  : "Есть"
			},
			// {
			// 	value : 2,
			// 	name  : "В контакте"
			// },
			// {
			// 	value : 3,
			// 	name  : "Instagram"
			// },
			// {
			// 	value : 4,
			// 	name  : "Youtube"
			// },
			// {
			// 	value : 5,
			// 	name  : "Twitter"
			// }
		]
	}
};