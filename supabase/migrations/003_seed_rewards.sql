insert into public.reward_definitions (id, type, label, color, description) values
  ('yellow_key', 'key', 'Yellow Key', '#f1c40f', 'Opens yellow doors'),
  ('blue_key', 'key', 'Blue Key', '#3498db', 'Opens blue doors'),
  ('red_key', 'key', 'Red Key', '#e74c3c', 'Opens red doors'),
  ('double_jump', 'skill', 'Double Jump', null, 'Jump again in mid-air'),
  ('dash', 'skill', 'Dash', null, 'Future movement upgrade'),
  ('bridge_token', 'key', 'Bridge Token', '#27ae60', 'Future bridge access')
on conflict (id) do update set
  label = excluded.label,
  color = excluded.color,
  description = excluded.description;
