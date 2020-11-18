export interface Report {
  id?:          string;
  title:       string;
  type:        string;
  date:        any;
  log:         number;
  description: string;
  time:        string;
  country:     string;
  lat:         number;
  userdi?:      string;
  enable?:      boolean;
  nperson:     number | string;
  icon?:       any;
}

export interface DateClass {
  seconds:     number;
  nanoseconds: number;
}
