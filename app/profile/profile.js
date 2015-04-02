'use strict';

angular.module('linkedoutApp')

.config(function ($routeProvider) {
    $routeProvider
        .when('/profile', {
            templateUrl: 'profile/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'ProfileCtrl'
        });
})

.controller('ProfileCtrl', [

    'Profile', 'COMMON',

    function (Profile, COMMON) {
        var self = this;

        self.me = null;
        self.hasProfile = false;
        self.profileError = false;

        self.options = {
            github: 'https://github.com/arthurnobrega',
            phone: '+55 (61) 8150-0086'
        };

        function convertBreaks(object, memberName) {
            object[memberName] = (object[memberName] || '').split('\n').join('<br>');
        }

        function convertAllBreaks(list, memberName) {
            if (list._total > 0) {
                list.values.forEach(function (el) {
                    convertBreaks(el, memberName);
                });
            }
        }

        var months = COMMON.months;

        self.formatDate = function (obj, fallback) {
            var str = '';
            if (!obj) {
                return fallback || str;
            }
            if ('day' in obj) {
                str += obj.day + ' ';
            }
            if ('month' in obj) {
                str += months[obj.month] + ' ';
            }
            return str + obj.year;
        };

        function transformProfileData(profileData) {
            if (profileData.lastModifiedTimestamp) {
                profileData.lastModifiedTimestamp = new Date(profileData.lastModifiedTimestamp);
            }
            convertBreaks(profileData, 'summary');
            convertAllBreaks(profileData.recommendationsReceived, 'recommendationText');
            convertAllBreaks(profileData.positions, 'summary');
            return profileData;
        }

        Profile.then(function (profile) {
            profile.get().then(function (profileData) {
                var me = transformProfileData(profileData);

                // Transform list of skill in 3 parts
                var skills = [];
                var skillsTotal = me.skills._total;
                var chunkSize = me.skills._total/3; // 3 columns
                for (var i = 0; i < skillsTotal; i += chunkSize) {
                    skills.push(me.skills.values.slice(i, i + chunkSize));
                }

                me.skills.values = skills;

                self.me = me;
                self.hasProfile = true;
            }, function (err) {
                self.profileError = true;
            });
        });

    }
]);
