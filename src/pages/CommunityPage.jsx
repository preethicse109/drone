import { motion } from 'framer-motion';
import { Users, MessageSquare, Trophy, Star, Heart, Share2, ArrowRight } from 'lucide-react';

const posts = [
  { user: 'RacingFPV', avatar: '🏎️', title: 'My 5" build – 98mph top speed!', likes: 245, comments: 42, time: '2h ago', tag: 'Racing' },
  { user: 'AerialMike', avatar: '📸', title: 'Tutorial: Perfect gimbal calibration', likes: 189, comments: 31, time: '5h ago', tag: 'Tutorial' },
  { user: 'DroneEngineer', avatar: '⚙️', title: 'Custom flight controller design', likes: 312, comments: 57, time: '1d ago', tag: 'Design' },
  { user: 'FarmDrones', avatar: '🌾', title: 'Agri-drone mapping 500 acres', likes: 134, comments: 22, time: '2d ago', tag: 'Agriculture' },
  { user: 'CinematicSkies', avatar: '🎬', title: 'Cinematic mountain flythrough', likes: 421, comments: 78, time: '3d ago', tag: 'Photography' },
  { user: 'TechPilot42', avatar: '🤖', title: 'Autonomous waypoint mission test', likes: 98, comments: 15, time: '4d ago', tag: 'Autonomous' },
];

const tagColors = {
  Racing: 'bg-red-100 text-red-700',
  Tutorial: 'bg-blue-100 text-blue-700',
  Design: 'bg-purple-100 text-purple-700',
  Agriculture: 'bg-green-100 text-green-700',
  Photography: 'bg-pink-100 text-pink-700',
  Autonomous: 'bg-amber-100 text-amber-700',
};

const leaderboard = [
  { rank: 1, user: 'DroneEngineer', builds: 24, badge: '🥇' },
  { rank: 2, user: 'AerialMike', builds: 19, badge: '🥈' },
  { rank: 3, user: 'RacingFPV', builds: 17, badge: '🥉' },
  { rank: 4, user: 'CinematicSkies', builds: 14, badge: '' },
  { rank: 5, user: 'TechPilot42', builds: 11, badge: '' },
];

export default function CommunityPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 page-transition">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Community</h1>
            <p className="text-sm text-slate-500">Share builds, get inspiration, learn from others</p>
          </div>
          <button className="btn-primary btn-sm" id="community-share">
            <Share2 size={13} /> Share Your Build
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: Users, label: 'Members', value: '12,847', color: 'text-primary-600 bg-primary-50' },
            { icon: MessageSquare, label: 'Posts', value: '48,312', color: 'text-emerald-600 bg-emerald-50' },
            { icon: Trophy, label: 'Builds Shared', value: '9,204', color: 'text-amber-600 bg-amber-50' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={18} />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Posts */}
          <div className="flex-1 space-y-3">
            <h2 className="text-sm font-semibold text-slate-800 mb-3">Latest Posts</h2>
            {posts.map((post, i) => (
              <motion.div
                key={i}
                className="card p-4 cursor-pointer hover:border-primary-200 transition-all"
                whileHover={{ x: 3 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                id={`community-post-${i}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-slate-800">{post.user}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${tagColors[post.tag] || 'bg-slate-100 text-slate-600'}`}>
                        {post.tag}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium mb-2">{post.title}</p>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart size={11} /> {post.likes}
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={11} /> {post.comments}
                      </span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 mt-1 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-64 space-y-4">
            {/* Leaderboard */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Trophy size={14} className="text-amber-500" /> Top Builders
              </h3>
              <div className="space-y-2">
                {leaderboard.map(({ rank, user, builds, badge }) => (
                  <div key={rank} className="flex items-center gap-2">
                    <span className="text-sm w-5 text-center">{badge || `#${rank}`}</span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                      {user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-700 truncate">{user}</div>
                    </div>
                    <div className="text-[10px] text-slate-400">{builds} builds</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="card p-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(tagColors).map(([tag, cls]) => (
                  <button key={tag} className={`text-[10px] px-2 py-1 rounded-full font-medium ${cls} hover:opacity-80 transition-opacity`}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="card p-4 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-100">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-sm font-semibold text-primary-900 mb-1">Join the Community</h3>
              <p className="text-[11px] text-primary-700 mb-3">Share your builds and get feedback from 12K+ drone enthusiasts.</p>
              <button className="w-full btn-primary btn-sm text-[11px]" id="community-join">Join Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
